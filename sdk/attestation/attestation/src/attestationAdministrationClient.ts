// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SpanStatusCode } from "@azure/core-tracing";

import { SDK_VERSION } from "./constants";
import { GeneratedClient } from "./generated/generatedClient";

import { logger } from "./logger";
import { createSpan } from "./tracing";

import {
  AttestationCertificateManagementBody,
  GeneratedClientOptionalParams,
  JsonWebKey,
  PolicyCertificatesResult
} from "./generated/models";

import { bytesToString } from "./utils/utf8";

import {
  AttestationResponse,
  AttestationTokenValidationOptions,
  AttestationType,
  PolicyResult,
  AttestationSigner,
  PolicyCertificatesModificationResult
} from "./models";
import { StoredAttestationPolicy } from "./models/storedAttestationPolicy";

import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import { TokenCredential } from "@azure/core-auth";
import { TypeDeserializer } from "./utils/typeDeserializer";
import * as Mappers from "./generated/models/mappers";

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../jsrsasign.d.ts"/>
import * as jsrsasign from "jsrsasign";
import { hexToBase64 } from "./utils/helpers";
import { _policyResultFromGenerated } from "./models/policyResult";
import { _attestationSignerFromGenerated } from "./models/attestationSigner";
import { verifyAttestationSigningKey } from "./utils/helpers";
import { createAttestationResponse } from "./models/attestationResponse";
import { AttestationTokenImpl } from "./models/attestationToken";

/**
 * Attestation Client Construction Options.
 */
export interface AttestationAdministrationClientOptions extends CommonClientOptions {
  /**
   * Options to be used globally to validate attestation tokens received from
   * the attestation service.
   */
  validationOptions?: AttestationTokenValidationOptions;
}

/**
 * Operation options for the Attestation Administration Client operations.
 */
export interface AttestationAdministrationClientOperationOptions extends OperationOptions {
  /**
   * Options to be used on individual calls to validate attestation tokens
   * received from the attestation service.
   */
  validationOptions?: AttestationTokenValidationOptions;
}

/**
 * Attestation Client class.
 *
 * The AttestationClient class enables access to the Attestation related APIs:
 *
 * - getPolicy
 * - setPolicy
 * - resetPolicy
 * - getPolicyManagementCertificates
 * - addPolicyManagementCertificate
 * - removePolicyManagementCertificate
 */
export class AttestationAdministrationClient {
  /**
   * Creates an instance of AttestationAdministrationClient.
   *
   * Example usage:
   * ```ts
   * import { AttestationAdministrationClient } from "@azure/attestation";
   *
   * const client = new AttestationAdministrationClient(
   *    "<service endpoint>",
   *    new TokenCredential("<>")
   * );
   * ```
   *
   * @param instanceUrl - The attestation instance base URI, for example https://mytenant.attest.azure.net.
   * @param credential - Used to authenticate requests to the service.
   * @param options - Used to configure the Form Recognizer client.
   */

  constructor(
    credentials: TokenCredential,
    instanceUrl: string,
    options: AttestationAdministrationClientOptions = {}
  ) {
    // The below code helps us set a proper User-Agent header on all requests
    const libInfo = `azsdk-js-api-security-attestation/${SDK_VERSION}`;
    if (!options.userAgentOptions) {
      options.userAgentOptions = {};
    }
    if (options.userAgentOptions.userAgentPrefix) {
      options.userAgentOptions.userAgentPrefix = `${options.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      options.userAgentOptions.userAgentPrefix = libInfo;
    }

    this._validationOptions = options.validationOptions;

    const internalPipelineOptions: GeneratedClientOptionalParams = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
          allowedHeaderNames: ["x-ms-request-id", "x-ms-maa-service-version"]
        }
      }
    };

    this._client = new GeneratedClient(credentials, instanceUrl, internalPipelineOptions);
  }

  /**
   * Retrieves the attestation policy document from the server, and returns it
   * to the caller.
   *
   * @param attestationType - AttestationType for which to retrieve policy.
   * @param options - Pipeline and client options for the `getPolicy` call.
   * @returns `AttestationResponse<string>` - the `value` property is the
   *      attestation policy,  the `token` property will be the actual token
   *      returned by the attestation service.
   */
  public async getPolicy(
    attestationType: AttestationType,
    options: AttestationAdministrationClientOperationOptions = {}
  ): Promise<AttestationResponse<string>> {
    const { span, updatedOptions } = createSpan(
      "AttestationAdministrationClient-getPolicy",
      options
    );
    try {
      const getPolicyResult = await this._client.policy.get(attestationType, updatedOptions);

      // The attestation token returned from the service has a PolicyResult
      // object as the body.
      const token = new AttestationTokenImpl(getPolicyResult.token);

      // Validate the token returned from the service.
      token.validateToken(
        await this.signingKeys(),
        options.validationOptions ?? this._validationOptions
      );

      // Deserialize the PolicyResult object to retrieve the underlying policy
      //  token
      const policyResult = _policyResultFromGenerated(token.getBody());

      // The policyResult.policy value will be a JSON Web Signature representing
      // the actual policy object being retrieved. Serialize the token to an
      // AttestationToken object so we can access the body properties on the token.
      if (!policyResult.policy) {
        throw Error("Server returned an invalid getPolicy response!");
      }

      const policyToken = new AttestationTokenImpl(policyResult.policy);

      const storedPolicy = StoredAttestationPolicy.deserialize(policyToken.getBody());

      // Finally, retrieve the stored attestationPolicy value and return that
      // as the AttestationResponse to the caller.
      return createAttestationResponse<string>(
        token,
        bytesToString(storedPolicy.attestationPolicy)
      );
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sets the attestation policy for the specified {@link attestationType}.
   *
   * @param attestationType - Attestation Type for which to set policy.
   * @param newPolicyDocument - Policy document to be set.
   * @param privateKey - optional private key used to sign the policy document.
   * @param certificate - optional certificate used to verify the policy document.
   * @param options - call options.
   * @returns An {@link AttestationResponse} wrapping a {@link PolicyResult}.
   *  Clients can use the PolicyResult to validate that the policy was actually
   *  set by the attestation service.
   *
   * @remarks
   *
   * Please note that if the attestation service instance is running in "Isolated"
   * mode, the {@link signingKey} must be one of the signing keys configured for the
   * service instance.
   *
   * @throws {@link Error} when a private key is specified without a certificate and vice versa.
   * @throws {@link Error} when the key in the certificate provided does not match the private key.
   */
  public async setPolicy(
    attestationType: AttestationType,
    newPolicyDocument: string,
    privateKey?: string,
    certificate?: string,
    options: AttestationAdministrationClientOperationOptions = {}
  ): Promise<AttestationResponse<PolicyResult>> {
    const { span, updatedOptions } = createSpan(
      "AttestationAdministrationClient-setPolicy",
      options
    );
    try {
      if ((!privateKey && certificate) || (privateKey && !certificate)) {
        throw new Error(
          "If privateKey is specified, certificate must also be provided. If certificate is provided, privateKey must also be provided."
        );
      }

      if (privateKey && certificate) {
        verifyAttestationSigningKey(privateKey, certificate);
      }

      const storedAttestationPolicy = new StoredAttestationPolicy(newPolicyDocument).serialize();
      const setPolicyToken = AttestationTokenImpl.create({
        body: storedAttestationPolicy,
        privateKey: privateKey,
        certificate: certificate
      });

      const setPolicyResult = await this._client.policy.set(
        attestationType,
        setPolicyToken.serialize(),
        updatedOptions
      );

      // The attestation token returned from the service has a PolicyResult
      // object as the body.
      const token = new AttestationTokenImpl(setPolicyResult.token);
      token.validateToken(
        await this.signingKeys(),
        options.validationOptions ?? this._validationOptions
      );

      // Deserialize the PolicyResult object to retrieve the underlying policy
      //  token
      const policyResult = _policyResultFromGenerated(token.getBody());

      // The policyResult.policy value will be a JSON Web Signature representing
      // the actual policy object being retrieved. Serialize the token to an
      // AttestationToken object so we can access the body properties on the token.
      return createAttestationResponse<PolicyResult>(token, policyResult);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Resets the attestation policy for the specified {@link attestationType} to
   * the default value.
   *
   * @param attestationType - Attestation Type for which to set policy.
   * @param privateKey - optional private key used to sign the policy document
   * @param certificate - optional certificate used to verify the policy document.
   * @param options - call options.
   * @returns An {@link AttestationResponse} wrapping a {@link PolicyResult}.
   *  Clients can use the PolicyResult to validate that the policy was actually
   *  reset by the attestation service.
   *
   * @remarks
   *
   * Please note that if the attestation service instance is running in "Isolated"
   * mode, the {@link signingKey} must be one of the signing keys configured for the
   * service instance.
   *
   * @throws {@link Error} when a private key is specified without a certificate and vice versa.
   * @throws {@link Error} when the key in the certificate provided does not match the private key.
   */

  public async resetPolicy(
    attestationType: AttestationType,
    privateKey?: string,
    certificate?: string,
    options: AttestationAdministrationClientOperationOptions = {}
  ): Promise<AttestationResponse<PolicyResult>> {
    const { span, updatedOptions } = createSpan(
      "AttestationAdministrationClient-setPolicy",
      options
    );
    try {
      if ((!privateKey && certificate) || (privateKey && !certificate)) {
        throw new Error(
          "If privateKey is specified, certificate must also be provided. If certificate is provided, privateKey must also be provided."
        );
      }

      if (privateKey && certificate) {
        verifyAttestationSigningKey(privateKey, certificate);
      }

      const resetPolicyToken = AttestationTokenImpl.create({
        privateKey: privateKey,
        certificate: certificate
      });

      const resetPolicyResult = await this._client.policy.reset(
        attestationType,
        resetPolicyToken.serialize(),
        updatedOptions
      );

      // The attestation token returned from the service has a PolicyResult
      // object as the body.
      const token = new AttestationTokenImpl(resetPolicyResult.token);
      token.validateToken(
        await this.signingKeys(),
        options.validationOptions ?? this._validationOptions
      );

      // Deserialize the PolicyResult object to retrieve the underlying policy
      //  token
      const policyResult = _policyResultFromGenerated(token.getBody());

      // The policyResult.policy value will be a JSON Web Signature representing
      // the actual policy object being retrieved. Serialize the token to an
      // AttestationToken object so we can access the body properties on the token.
      return createAttestationResponse<PolicyResult>(token, policyResult);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /** Returns the set of policy management certificates for this attestation instance.
   *
   * @remarks If the attestation instance is not in `Isolated` mode, this list will
   *    always be empty.
   *
   * @param options - Options for the call to the attestation service.
   * @returns AttestationResponse wrapping a list of Attestation Signers.
   */
  public async getPolicyManagementCertificates(
    options: AttestationAdministrationClientOperationOptions = {}
  ): Promise<AttestationResponse<AttestationSigner[]>> {
    const { span, updatedOptions } = createSpan(
      "AttestationAdministrationClient-getPolicyManagementCertificates",
      options
    );
    try {
      const getCertificatesResult = await this._client.policyCertificates.get(updatedOptions);
      // The attestation token returned from the service has a PolicyResult
      // object as the body.
      const token = new AttestationTokenImpl(getCertificatesResult.token);
      token.validateToken(
        await this.signingKeys(),
        options.validationOptions ?? this._validationOptions
      );

      // Deserialize the PolicyResult object to retrieve the underlying policy
      //  token
      const jwks = TypeDeserializer.deserialize(
        token.getBody(),
        {
          PolicyCertificatesResult: Mappers.PolicyCertificatesResult,
          JsonWebKeySet: Mappers.JsonWebKeySet,
          JsonWebKey: Mappers.JsonWebKey
        },
        "PolicyCertificatesResult"
      ) as PolicyCertificatesResult;

      const policyCertificates = new Array<AttestationSigner>();
      jwks.policyCertificates.keys.forEach((jwk) => {
        policyCertificates.push(_attestationSignerFromGenerated(jwk));
      });

      return createAttestationResponse<AttestationSigner[]>(token, policyCertificates);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  /** Add a new certificate chain to the set of policy management certificates.
   *
   * @param pemCertificate - PEM encoded certificate to add to the set of policy management certificates.
   * @param privateKey - Existing attestation private key used to sign the incoming request.
   * @param certificate - Existing attestation certificate used to verify the incoming request.
   * @param options - Options used in the call to the service.
   * @returns An attestation response including a PolicyCertificatesModificationResult
   *
   * @remarks This API is only supported on `isolated` attestation instances.
   *
   * The signing key MUST be one of the existing attestation signing certificates. The
   * new pemCertificate is signed using the signingKey and the service will validate the
   * signature before allowing the addition.
   *
   * @throws {@link Error} when a private key is specified without a certificate and vice versa.
   * @throws {@link Error} when the key in the certificate provided does not match the private key.
   *
   */
  public async addPolicyManagementCertificate(
    pemCertificate: string,
    privateKey: string,
    certificate: string,
    options: AttestationAdministrationClientOperationOptions = {}
  ): Promise<AttestationResponse<PolicyCertificatesModificationResult>> {
    const { span, updatedOptions } = createSpan(
      "AttestationAdministrationClient-addPolicyManagementCertificate",
      options
    );
    try {
      if ((!privateKey && certificate) || (privateKey && !certificate)) {
        throw new Error(
          "If privateKey is specified, certificate must also be provided. If certificate is provided, privateKey must also be provided."
        );
      }

      if (privateKey && certificate) {
        verifyAttestationSigningKey(privateKey, certificate);
      }

      const cert = new jsrsasign.X509();
      cert.readCertPEM(pemCertificate);
      const kty = this.keyTypeFromCertificate(cert);

      const jwk: JsonWebKey = {
        x5C: [hexToBase64(cert.hex)],
        kty: kty
      };

      const addBody: AttestationCertificateManagementBody = {
        policyCertificate: jwk
      };

      const addCertToken = AttestationTokenImpl.create({
        body: TypeDeserializer.serialize(
          addBody,
          {
            AttestationCertificateManagementBody: Mappers.AttestationCertificateManagementBody,
            JsonWebKey: Mappers.JsonWebKey
          },
          Mappers.AttestationCertificateManagementBody
        ),
        privateKey: privateKey,
        certificate: certificate
      });

      const addCertificateResult = await this._client.policyCertificates.add(
        addCertToken.serialize(),
        updatedOptions
      );
      // The attestation token returned from the service has a PolicyResult
      // object as the body.
      const token = new AttestationTokenImpl(addCertificateResult.token);
      token.validateToken(
        await this.signingKeys(),
        options.validationOptions ?? this._validationOptions
      );

      // Deserialize the PolicyCertificatesModificationResult object.
      const result = TypeDeserializer.deserialize(
        token.getBody(),
        {
          PolicyCertificatesModificationResult: Mappers.PolicyCertificatesModificationResult,
          JsonWebKeySet: Mappers.JsonWebKeySet,
          JsonWebKey: Mappers.JsonWebKey
        },
        "PolicyCertificatesModificationResult"
      ) as PolicyCertificatesModificationResult;

      return createAttestationResponse<PolicyCertificatesModificationResult>(token, result);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  private keyTypeFromCertificate(cert: any): string {
    let kty: string;
    switch (cert.getSignatureAlgorithmName()) {
      case "SHA256withRSA":
      case "SHA384withRSA":
      case "SHA512withRSA":
        kty = "RSA";
        break;
      case "SHA256withECDSA":
      case "SHA384withECDSA":
        kty = "EC";
        break;
      default:
        kty = "RSA";
        break;
    }
    return kty;
  }

  /** Add a new certificate chain to the set of policy management certificates.
   *
   * @param pemCertificate - PEM encoded certificate to add to the set of policy management certificates.
   * @param privateKey - Existing attestation private key used to sign the incoming request.
   * @param certificate - Existing attestation certificate used to verify the incoming request.
   * @param options - Options used in the call to the service.
   * @returns An attestation response including a PolicyCertificatesModificationResult
   *
   * @remarks This API is only supported on `isolated` attestation instances.
   *
   * The signing key MUST be one of the existing attestation signing certificates. The
   * new pemCertificate is signed using the signingKey and the service will validate the
   * signature before allowing the addition.
   *
   * @throws {@link Error} when a private key is specified without a certificate and vice versa.
   * @throws {@link Error} when the key in the certificate provided does not match the private key.
   */
  public async removePolicyManagementCertificate(
    pemCertificate: string,
    privateKey: string,
    certificate: string,
    options: AttestationAdministrationClientOperationOptions = {}
  ): Promise<AttestationResponse<PolicyCertificatesModificationResult>> {
    const { span, updatedOptions } = createSpan(
      "AttestationAdministrationClient-removePolicyManagementCertificate",
      options
    );
    try {
      if ((!privateKey && certificate) || (privateKey && !certificate)) {
        throw new Error(
          "If privateKey is specified, certificate must also be provided. If certificate is provided, privateKey must also be provided."
        );
      }

      if (privateKey && certificate) {
        verifyAttestationSigningKey(privateKey, certificate);
      }

      const cert = new jsrsasign.X509();
      cert.readCertPEM(pemCertificate);
      const kty = this.keyTypeFromCertificate(cert);

      const jwk: JsonWebKey = {
        x5C: [hexToBase64(cert.hex)],
        kty: kty
      };

      const addBody: AttestationCertificateManagementBody = {
        policyCertificate: jwk
      };

      const removeCertToken = AttestationTokenImpl.create({
        body: TypeDeserializer.serialize(
          addBody,
          {
            AttestationCertificateManagementBody: Mappers.AttestationCertificateManagementBody,
            JsonWebKey: Mappers.JsonWebKey
          },
          Mappers.AttestationCertificateManagementBody
        ),
        privateKey: privateKey,
        certificate: certificate
      });

      const removeCertificateResult = await this._client.policyCertificates.remove(
        removeCertToken.serialize(),
        updatedOptions
      );
      // The attestation token returned from the service has a PolicyResult
      // object as the body.
      const token = new AttestationTokenImpl(removeCertificateResult.token);
      token.validateToken(
        await this.signingKeys(),
        options.validationOptions ?? this._validationOptions
      );

      // Deserialize the PolicyCertificatesModificationResult object.
      const result = TypeDeserializer.deserialize(
        token.getBody(),
        {
          PolicyCertificatesModificationResult: Mappers.PolicyCertificatesModificationResult,
          JsonWebKeySet: Mappers.JsonWebKeySet,
          JsonWebKey: Mappers.JsonWebKey
        },
        "PolicyCertificatesModificationResult"
      ) as PolicyCertificatesModificationResult;

      return createAttestationResponse<PolicyCertificatesModificationResult>(token, result);
    } catch (e) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });
      throw e;
    } finally {
      span.end();
    }
  }

  private async signingKeys(): Promise<AttestationSigner[]> {
    if (this._signers !== undefined) {
      return this._signers;
    }
    const jwks = await this._client.signingCertificates.get();
    const signers: AttestationSigner[] = new Array();
    jwks.keys?.forEach((element) => {
      signers.push(_attestationSignerFromGenerated(element));
    });
    this._signers = signers;
    return this._signers;
  }

  private _client: GeneratedClient;
  private _signers?: AttestationSigner[];
  private _validationOptions?: AttestationTokenValidationOptions;
}
