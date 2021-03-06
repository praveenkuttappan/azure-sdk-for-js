/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as Models from "../models";
import * as Mappers from "../models/apiIssueCommentMappers";
import * as Parameters from "../models/parameters";
import { ApiManagementClientContext } from "../apiManagementClientContext";

/** Class representing a ApiIssueComment. */
export class ApiIssueComment {
  private readonly client: ApiManagementClientContext;

  /**
   * Create a ApiIssueComment.
   * @param {ApiManagementClientContext} client Reference to the service client.
   */
  constructor(client: ApiManagementClientContext) {
    this.client = client;
  }

  /**
   * Lists all comments for the Issue associated with the specified API.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param [options] The optional parameters
   * @returns Promise<Models.ApiIssueCommentListByServiceResponse>
   */
  listByService(resourceGroupName: string, serviceName: string, apiId: string, issueId: string, options?: Models.ApiIssueCommentListByServiceOptionalParams): Promise<Models.ApiIssueCommentListByServiceResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param callback The callback
   */
  listByService(resourceGroupName: string, serviceName: string, apiId: string, issueId: string, callback: msRest.ServiceCallback<Models.IssueCommentCollection>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param options The optional parameters
   * @param callback The callback
   */
  listByService(resourceGroupName: string, serviceName: string, apiId: string, issueId: string, options: Models.ApiIssueCommentListByServiceOptionalParams, callback: msRest.ServiceCallback<Models.IssueCommentCollection>): void;
  listByService(resourceGroupName: string, serviceName: string, apiId: string, issueId: string, options?: Models.ApiIssueCommentListByServiceOptionalParams | msRest.ServiceCallback<Models.IssueCommentCollection>, callback?: msRest.ServiceCallback<Models.IssueCommentCollection>): Promise<Models.ApiIssueCommentListByServiceResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        apiId,
        issueId,
        options
      },
      listByServiceOperationSpec,
      callback) as Promise<Models.ApiIssueCommentListByServiceResponse>;
  }

  /**
   * Gets the entity state (Etag) version of the issue Comment for an API specified by its
   * identifier.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param commentId Comment identifier within an Issue. Must be unique in the current Issue.
   * @param [options] The optional parameters
   * @returns Promise<Models.ApiIssueCommentGetEntityTagResponse>
   */
  getEntityTag(resourceGroupName: string, serviceName: string, apiId: string, issueId: string, commentId: string, options?: msRest.RequestOptionsBase): Promise<Models.ApiIssueCommentGetEntityTagResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param commentId Comment identifier within an Issue. Must be unique in the current Issue.
   * @param callback The callback
   */
  getEntityTag(resourceGroupName: string, serviceName: string, apiId: string, issueId: string, commentId: string, callback: msRest.ServiceCallback<void>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param commentId Comment identifier within an Issue. Must be unique in the current Issue.
   * @param options The optional parameters
   * @param callback The callback
   */
  getEntityTag(resourceGroupName: string, serviceName: string, apiId: string, issueId: string, commentId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  getEntityTag(resourceGroupName: string, serviceName: string, apiId: string, issueId: string, commentId: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<Models.ApiIssueCommentGetEntityTagResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        apiId,
        issueId,
        commentId,
        options
      },
      getEntityTagOperationSpec,
      callback) as Promise<Models.ApiIssueCommentGetEntityTagResponse>;
  }

  /**
   * Gets the details of the issue Comment for an API specified by its identifier.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param commentId Comment identifier within an Issue. Must be unique in the current Issue.
   * @param [options] The optional parameters
   * @returns Promise<Models.ApiIssueCommentGetResponse>
   */
  get(resourceGroupName: string, serviceName: string, apiId: string, issueId: string, commentId: string, options?: msRest.RequestOptionsBase): Promise<Models.ApiIssueCommentGetResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param commentId Comment identifier within an Issue. Must be unique in the current Issue.
   * @param callback The callback
   */
  get(resourceGroupName: string, serviceName: string, apiId: string, issueId: string, commentId: string, callback: msRest.ServiceCallback<Models.IssueCommentContract>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param commentId Comment identifier within an Issue. Must be unique in the current Issue.
   * @param options The optional parameters
   * @param callback The callback
   */
  get(resourceGroupName: string, serviceName: string, apiId: string, issueId: string, commentId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.IssueCommentContract>): void;
  get(resourceGroupName: string, serviceName: string, apiId: string, issueId: string, commentId: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.IssueCommentContract>, callback?: msRest.ServiceCallback<Models.IssueCommentContract>): Promise<Models.ApiIssueCommentGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        apiId,
        issueId,
        commentId,
        options
      },
      getOperationSpec,
      callback) as Promise<Models.ApiIssueCommentGetResponse>;
  }

  /**
   * Creates a new Comment for the Issue in an API or updates an existing one.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param commentId Comment identifier within an Issue. Must be unique in the current Issue.
   * @param parameters Create parameters.
   * @param [options] The optional parameters
   * @returns Promise<Models.ApiIssueCommentCreateOrUpdateResponse>
   */
  createOrUpdate(resourceGroupName: string, serviceName: string, apiId: string, issueId: string, commentId: string, parameters: Models.IssueCommentContract, options?: Models.ApiIssueCommentCreateOrUpdateOptionalParams): Promise<Models.ApiIssueCommentCreateOrUpdateResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param commentId Comment identifier within an Issue. Must be unique in the current Issue.
   * @param parameters Create parameters.
   * @param callback The callback
   */
  createOrUpdate(resourceGroupName: string, serviceName: string, apiId: string, issueId: string, commentId: string, parameters: Models.IssueCommentContract, callback: msRest.ServiceCallback<Models.IssueCommentContract>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param commentId Comment identifier within an Issue. Must be unique in the current Issue.
   * @param parameters Create parameters.
   * @param options The optional parameters
   * @param callback The callback
   */
  createOrUpdate(resourceGroupName: string, serviceName: string, apiId: string, issueId: string, commentId: string, parameters: Models.IssueCommentContract, options: Models.ApiIssueCommentCreateOrUpdateOptionalParams, callback: msRest.ServiceCallback<Models.IssueCommentContract>): void;
  createOrUpdate(resourceGroupName: string, serviceName: string, apiId: string, issueId: string, commentId: string, parameters: Models.IssueCommentContract, options?: Models.ApiIssueCommentCreateOrUpdateOptionalParams | msRest.ServiceCallback<Models.IssueCommentContract>, callback?: msRest.ServiceCallback<Models.IssueCommentContract>): Promise<Models.ApiIssueCommentCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        apiId,
        issueId,
        commentId,
        parameters,
        options
      },
      createOrUpdateOperationSpec,
      callback) as Promise<Models.ApiIssueCommentCreateOrUpdateResponse>;
  }

  /**
   * Deletes the specified comment from an Issue.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param commentId Comment identifier within an Issue. Must be unique in the current Issue.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   * response of the GET request or it should be * for unconditional update.
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  deleteMethod(resourceGroupName: string, serviceName: string, apiId: string, issueId: string, commentId: string, ifMatch: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param commentId Comment identifier within an Issue. Must be unique in the current Issue.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   * response of the GET request or it should be * for unconditional update.
   * @param callback The callback
   */
  deleteMethod(resourceGroupName: string, serviceName: string, apiId: string, issueId: string, commentId: string, ifMatch: string, callback: msRest.ServiceCallback<void>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param commentId Comment identifier within an Issue. Must be unique in the current Issue.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   * response of the GET request or it should be * for unconditional update.
   * @param options The optional parameters
   * @param callback The callback
   */
  deleteMethod(resourceGroupName: string, serviceName: string, apiId: string, issueId: string, commentId: string, ifMatch: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  deleteMethod(resourceGroupName: string, serviceName: string, apiId: string, issueId: string, commentId: string, ifMatch: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        apiId,
        issueId,
        commentId,
        ifMatch,
        options
      },
      deleteMethodOperationSpec,
      callback);
  }

  /**
   * Lists all comments for the Issue associated with the specified API.
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.ApiIssueCommentListByServiceNextResponse>
   */
  listByServiceNext(nextPageLink: string, options?: Models.ApiIssueCommentListByServiceNextOptionalParams): Promise<Models.ApiIssueCommentListByServiceNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listByServiceNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.IssueCommentCollection>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listByServiceNext(nextPageLink: string, options: Models.ApiIssueCommentListByServiceNextOptionalParams, callback: msRest.ServiceCallback<Models.IssueCommentCollection>): void;
  listByServiceNext(nextPageLink: string, options?: Models.ApiIssueCommentListByServiceNextOptionalParams | msRest.ServiceCallback<Models.IssueCommentCollection>, callback?: msRest.ServiceCallback<Models.IssueCommentCollection>): Promise<Models.ApiIssueCommentListByServiceNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listByServiceNextOperationSpec,
      callback) as Promise<Models.ApiIssueCommentListByServiceNextResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const listByServiceOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/issues/{issueId}/comments",
  urlParameters: [
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.apiId1,
    Parameters.issueId,
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.filter0,
    Parameters.top,
    Parameters.skip,
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.IssueCommentCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const getEntityTagOperationSpec: msRest.OperationSpec = {
  httpMethod: "HEAD",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/issues/{issueId}/comments/{commentId}",
  urlParameters: [
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.apiId1,
    Parameters.issueId,
    Parameters.commentId,
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      headersMapper: Mappers.ApiIssueCommentGetEntityTagHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
      headersMapper: Mappers.ApiIssueCommentGetEntityTagHeaders
    }
  },
  serializer
};

const getOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/issues/{issueId}/comments/{commentId}",
  urlParameters: [
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.apiId1,
    Parameters.issueId,
    Parameters.commentId,
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.IssueCommentContract,
      headersMapper: Mappers.ApiIssueCommentGetHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
      headersMapper: Mappers.ApiIssueCommentGetHeaders
    }
  },
  serializer
};

const createOrUpdateOperationSpec: msRest.OperationSpec = {
  httpMethod: "PUT",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/issues/{issueId}/comments/{commentId}",
  urlParameters: [
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.apiId1,
    Parameters.issueId,
    Parameters.commentId,
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.ifMatch0,
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "parameters",
    mapper: {
      ...Mappers.IssueCommentContract,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.IssueCommentContract,
      headersMapper: Mappers.ApiIssueCommentCreateOrUpdateHeaders
    },
    201: {
      bodyMapper: Mappers.IssueCommentContract,
      headersMapper: Mappers.ApiIssueCommentCreateOrUpdateHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
      headersMapper: Mappers.ApiIssueCommentCreateOrUpdateHeaders
    }
  },
  serializer
};

const deleteMethodOperationSpec: msRest.OperationSpec = {
  httpMethod: "DELETE",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/issues/{issueId}/comments/{commentId}",
  urlParameters: [
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.apiId1,
    Parameters.issueId,
    Parameters.commentId,
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.ifMatch1,
    Parameters.acceptLanguage
  ],
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const listByServiceNextOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  baseUrl: "https://management.azure.com",
  path: "{nextLink}",
  urlParameters: [
    Parameters.nextPageLink
  ],
  queryParameters: [
    Parameters.filter0,
    Parameters.top,
    Parameters.skip,
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.IssueCommentCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};
