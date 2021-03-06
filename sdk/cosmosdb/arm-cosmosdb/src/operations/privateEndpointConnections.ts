/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as Models from "../models";
import * as Mappers from "../models/privateEndpointConnectionsMappers";
import * as Parameters from "../models/parameters";
import { CosmosDBManagementClientContext } from "../cosmosDBManagementClientContext";

/** Class representing a PrivateEndpointConnections. */
export class PrivateEndpointConnections {
  private readonly client: CosmosDBManagementClientContext;

  /**
   * Create a PrivateEndpointConnections.
   * @param {CosmosDBManagementClientContext} client Reference to the service client.
   */
  constructor(client: CosmosDBManagementClientContext) {
    this.client = client;
  }

  /**
   * List all private endpoint connections on a Cosmos DB account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param [options] The optional parameters
   * @returns Promise<Models.PrivateEndpointConnectionsListByDatabaseAccountResponse>
   */
  listByDatabaseAccount(resourceGroupName: string, accountName: string, options?: msRest.RequestOptionsBase): Promise<Models.PrivateEndpointConnectionsListByDatabaseAccountResponse>;
  /**
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param callback The callback
   */
  listByDatabaseAccount(resourceGroupName: string, accountName: string, callback: msRest.ServiceCallback<Models.PrivateEndpointConnectionListResult>): void;
  /**
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param options The optional parameters
   * @param callback The callback
   */
  listByDatabaseAccount(resourceGroupName: string, accountName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PrivateEndpointConnectionListResult>): void;
  listByDatabaseAccount(resourceGroupName: string, accountName: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.PrivateEndpointConnectionListResult>, callback?: msRest.ServiceCallback<Models.PrivateEndpointConnectionListResult>): Promise<Models.PrivateEndpointConnectionsListByDatabaseAccountResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        options
      },
      listByDatabaseAccountOperationSpec,
      callback) as Promise<Models.PrivateEndpointConnectionsListByDatabaseAccountResponse>;
  }

  /**
   * Gets a private endpoint connection.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param privateEndpointConnectionName The name of the private endpoint connection.
   * @param [options] The optional parameters
   * @returns Promise<Models.PrivateEndpointConnectionsGetResponse>
   */
  get(resourceGroupName: string, accountName: string, privateEndpointConnectionName: string, options?: msRest.RequestOptionsBase): Promise<Models.PrivateEndpointConnectionsGetResponse>;
  /**
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param privateEndpointConnectionName The name of the private endpoint connection.
   * @param callback The callback
   */
  get(resourceGroupName: string, accountName: string, privateEndpointConnectionName: string, callback: msRest.ServiceCallback<Models.PrivateEndpointConnection>): void;
  /**
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param privateEndpointConnectionName The name of the private endpoint connection.
   * @param options The optional parameters
   * @param callback The callback
   */
  get(resourceGroupName: string, accountName: string, privateEndpointConnectionName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.PrivateEndpointConnection>): void;
  get(resourceGroupName: string, accountName: string, privateEndpointConnectionName: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.PrivateEndpointConnection>, callback?: msRest.ServiceCallback<Models.PrivateEndpointConnection>): Promise<Models.PrivateEndpointConnectionsGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        privateEndpointConnectionName,
        options
      },
      getOperationSpec,
      callback) as Promise<Models.PrivateEndpointConnectionsGetResponse>;
  }

  /**
   * Approve or reject a private endpoint connection with a given name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param privateEndpointConnectionName The name of the private endpoint connection.
   * @param parameters
   * @param [options] The optional parameters
   * @returns Promise<Models.PrivateEndpointConnectionsCreateOrUpdateResponse>
   */
  createOrUpdate(resourceGroupName: string, accountName: string, privateEndpointConnectionName: string, parameters: Models.PrivateEndpointConnection, options?: msRest.RequestOptionsBase): Promise<Models.PrivateEndpointConnectionsCreateOrUpdateResponse> {
    return this.beginCreateOrUpdate(resourceGroupName,accountName,privateEndpointConnectionName,parameters,options)
      .then(lroPoller => lroPoller.pollUntilFinished()) as Promise<Models.PrivateEndpointConnectionsCreateOrUpdateResponse>;
  }

  /**
   * Deletes a private endpoint connection with a given name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param privateEndpointConnectionName The name of the private endpoint connection.
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  deleteMethod(resourceGroupName: string, accountName: string, privateEndpointConnectionName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse> {
    return this.beginDeleteMethod(resourceGroupName,accountName,privateEndpointConnectionName,options)
      .then(lroPoller => lroPoller.pollUntilFinished());
  }

  /**
   * Approve or reject a private endpoint connection with a given name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param privateEndpointConnectionName The name of the private endpoint connection.
   * @param parameters
   * @param [options] The optional parameters
   * @returns Promise<msRestAzure.LROPoller>
   */
  beginCreateOrUpdate(resourceGroupName: string, accountName: string, privateEndpointConnectionName: string, parameters: Models.PrivateEndpointConnection, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller> {
    return this.client.sendLRORequest(
      {
        resourceGroupName,
        accountName,
        privateEndpointConnectionName,
        parameters,
        options
      },
      beginCreateOrUpdateOperationSpec,
      options);
  }

  /**
   * Deletes a private endpoint connection with a given name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param privateEndpointConnectionName The name of the private endpoint connection.
   * @param [options] The optional parameters
   * @returns Promise<msRestAzure.LROPoller>
   */
  beginDeleteMethod(resourceGroupName: string, accountName: string, privateEndpointConnectionName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller> {
    return this.client.sendLRORequest(
      {
        resourceGroupName,
        accountName,
        privateEndpointConnectionName,
        options
      },
      beginDeleteMethodOperationSpec,
      options);
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const listByDatabaseAccountOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/privateEndpointConnections",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.PrivateEndpointConnectionListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const getOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/privateEndpointConnections/{privateEndpointConnectionName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.privateEndpointConnectionName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.PrivateEndpointConnection
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const beginCreateOrUpdateOperationSpec: msRest.OperationSpec = {
  httpMethod: "PUT",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/privateEndpointConnections/{privateEndpointConnectionName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.privateEndpointConnectionName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "parameters",
    mapper: {
      ...Mappers.PrivateEndpointConnection,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.PrivateEndpointConnection
    },
    202: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const beginDeleteMethodOperationSpec: msRest.OperationSpec = {
  httpMethod: "DELETE",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/privateEndpointConnections/{privateEndpointConnectionName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.privateEndpointConnectionName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};
