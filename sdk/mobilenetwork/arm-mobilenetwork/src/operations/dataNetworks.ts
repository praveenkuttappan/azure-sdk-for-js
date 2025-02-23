/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { DataNetworks } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { MobileNetworkManagementClient } from "../mobileNetworkManagementClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  DataNetwork,
  DataNetworksListByMobileNetworkNextOptionalParams,
  DataNetworksListByMobileNetworkOptionalParams,
  DataNetworksListByMobileNetworkResponse,
  DataNetworksDeleteOptionalParams,
  DataNetworksGetOptionalParams,
  DataNetworksGetResponse,
  DataNetworksCreateOrUpdateOptionalParams,
  DataNetworksCreateOrUpdateResponse,
  TagsObject,
  DataNetworksUpdateTagsOptionalParams,
  DataNetworksUpdateTagsResponse,
  DataNetworksListByMobileNetworkNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing DataNetworks operations. */
export class DataNetworksImpl implements DataNetworks {
  private readonly client: MobileNetworkManagementClient;

  /**
   * Initialize a new instance of the class DataNetworks class.
   * @param client Reference to the service client
   */
  constructor(client: MobileNetworkManagementClient) {
    this.client = client;
  }

  /**
   * Lists all data networks in the mobile network.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param mobileNetworkName The name of the mobile network.
   * @param options The options parameters.
   */
  public listByMobileNetwork(
    resourceGroupName: string,
    mobileNetworkName: string,
    options?: DataNetworksListByMobileNetworkOptionalParams,
  ): PagedAsyncIterableIterator<DataNetwork> {
    const iter = this.listByMobileNetworkPagingAll(
      resourceGroupName,
      mobileNetworkName,
      options,
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listByMobileNetworkPagingPage(
          resourceGroupName,
          mobileNetworkName,
          options,
          settings,
        );
      },
    };
  }

  private async *listByMobileNetworkPagingPage(
    resourceGroupName: string,
    mobileNetworkName: string,
    options?: DataNetworksListByMobileNetworkOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<DataNetwork[]> {
    let result: DataNetworksListByMobileNetworkResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByMobileNetwork(
        resourceGroupName,
        mobileNetworkName,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByMobileNetworkNext(
        resourceGroupName,
        mobileNetworkName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByMobileNetworkPagingAll(
    resourceGroupName: string,
    mobileNetworkName: string,
    options?: DataNetworksListByMobileNetworkOptionalParams,
  ): AsyncIterableIterator<DataNetwork> {
    for await (const page of this.listByMobileNetworkPagingPage(
      resourceGroupName,
      mobileNetworkName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Deletes the specified data network.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param mobileNetworkName The name of the mobile network.
   * @param dataNetworkName The name of the data network.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    mobileNetworkName: string,
    dataNetworkName: string,
    options?: DataNetworksDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, mobileNetworkName, dataNetworkName, options },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deletes the specified data network.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param mobileNetworkName The name of the mobile network.
   * @param dataNetworkName The name of the data network.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    mobileNetworkName: string,
    dataNetworkName: string,
    options?: DataNetworksDeleteOptionalParams,
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      mobileNetworkName,
      dataNetworkName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Gets information about the specified data network.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param mobileNetworkName The name of the mobile network.
   * @param dataNetworkName The name of the data network.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    mobileNetworkName: string,
    dataNetworkName: string,
    options?: DataNetworksGetOptionalParams,
  ): Promise<DataNetworksGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, mobileNetworkName, dataNetworkName, options },
      getOperationSpec,
    );
  }

  /**
   * Creates or updates a data network. Must be created in the same location as its parent mobile
   * network.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param mobileNetworkName The name of the mobile network.
   * @param dataNetworkName The name of the data network.
   * @param parameters Parameters supplied to the create or update data network operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    mobileNetworkName: string,
    dataNetworkName: string,
    parameters: DataNetwork,
    options?: DataNetworksCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<DataNetworksCreateOrUpdateResponse>,
      DataNetworksCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<DataNetworksCreateOrUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: {
        resourceGroupName,
        mobileNetworkName,
        dataNetworkName,
        parameters,
        options,
      },
      spec: createOrUpdateOperationSpec,
    });
    const poller = await createHttpPoller<
      DataNetworksCreateOrUpdateResponse,
      OperationState<DataNetworksCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Creates or updates a data network. Must be created in the same location as its parent mobile
   * network.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param mobileNetworkName The name of the mobile network.
   * @param dataNetworkName The name of the data network.
   * @param parameters Parameters supplied to the create or update data network operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    mobileNetworkName: string,
    dataNetworkName: string,
    parameters: DataNetwork,
    options?: DataNetworksCreateOrUpdateOptionalParams,
  ): Promise<DataNetworksCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      mobileNetworkName,
      dataNetworkName,
      parameters,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Updates data network tags.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param mobileNetworkName The name of the mobile network.
   * @param dataNetworkName The name of the data network.
   * @param parameters Parameters supplied to update data network tags.
   * @param options The options parameters.
   */
  updateTags(
    resourceGroupName: string,
    mobileNetworkName: string,
    dataNetworkName: string,
    parameters: TagsObject,
    options?: DataNetworksUpdateTagsOptionalParams,
  ): Promise<DataNetworksUpdateTagsResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        mobileNetworkName,
        dataNetworkName,
        parameters,
        options,
      },
      updateTagsOperationSpec,
    );
  }

  /**
   * Lists all data networks in the mobile network.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param mobileNetworkName The name of the mobile network.
   * @param options The options parameters.
   */
  private _listByMobileNetwork(
    resourceGroupName: string,
    mobileNetworkName: string,
    options?: DataNetworksListByMobileNetworkOptionalParams,
  ): Promise<DataNetworksListByMobileNetworkResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, mobileNetworkName, options },
      listByMobileNetworkOperationSpec,
    );
  }

  /**
   * ListByMobileNetworkNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param mobileNetworkName The name of the mobile network.
   * @param nextLink The nextLink from the previous successful call to the ListByMobileNetwork method.
   * @param options The options parameters.
   */
  private _listByMobileNetworkNext(
    resourceGroupName: string,
    mobileNetworkName: string,
    nextLink: string,
    options?: DataNetworksListByMobileNetworkNextOptionalParams,
  ): Promise<DataNetworksListByMobileNetworkNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, mobileNetworkName, nextLink, options },
      listByMobileNetworkNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MobileNetwork/mobileNetworks/{mobileNetworkName}/dataNetworks/{dataNetworkName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.mobileNetworkName,
    Parameters.dataNetworkName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MobileNetwork/mobileNetworks/{mobileNetworkName}/dataNetworks/{dataNetworkName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataNetwork,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.mobileNetworkName,
    Parameters.dataNetworkName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MobileNetwork/mobileNetworks/{mobileNetworkName}/dataNetworks/{dataNetworkName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.DataNetwork,
    },
    201: {
      bodyMapper: Mappers.DataNetwork,
    },
    202: {
      bodyMapper: Mappers.DataNetwork,
    },
    204: {
      bodyMapper: Mappers.DataNetwork,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.parameters2,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.mobileNetworkName,
    Parameters.dataNetworkName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const updateTagsOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MobileNetwork/mobileNetworks/{mobileNetworkName}/dataNetworks/{dataNetworkName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.DataNetwork,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.parameters1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.mobileNetworkName,
    Parameters.dataNetworkName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const listByMobileNetworkOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MobileNetwork/mobileNetworks/{mobileNetworkName}/dataNetworks",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataNetworkListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.mobileNetworkName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByMobileNetworkNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataNetworkListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink,
    Parameters.mobileNetworkName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
