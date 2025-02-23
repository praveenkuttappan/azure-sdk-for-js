/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import {
  ClusterPrincipalAssignment,
  ClusterPrincipalAssignmentsListOptionalParams,
  ClusterPrincipalAssignmentCheckNameRequest,
  ClusterPrincipalAssignmentsCheckNameAvailabilityOptionalParams,
  ClusterPrincipalAssignmentsCheckNameAvailabilityResponse,
  ClusterPrincipalAssignmentsGetOptionalParams,
  ClusterPrincipalAssignmentsGetResponse,
  ClusterPrincipalAssignmentsCreateOrUpdateOptionalParams,
  ClusterPrincipalAssignmentsCreateOrUpdateResponse,
  ClusterPrincipalAssignmentsDeleteOptionalParams,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a ClusterPrincipalAssignments. */
export interface ClusterPrincipalAssignments {
  /**
   * Lists all Kusto cluster principalAssignments.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kusto cluster.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    clusterName: string,
    options?: ClusterPrincipalAssignmentsListOptionalParams,
  ): PagedAsyncIterableIterator<ClusterPrincipalAssignment>;
  /**
   * Checks that the principal assignment name is valid and is not already in use.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kusto cluster.
   * @param principalAssignmentName The name of the principal assignment.
   * @param options The options parameters.
   */
  checkNameAvailability(
    resourceGroupName: string,
    clusterName: string,
    principalAssignmentName: ClusterPrincipalAssignmentCheckNameRequest,
    options?: ClusterPrincipalAssignmentsCheckNameAvailabilityOptionalParams,
  ): Promise<ClusterPrincipalAssignmentsCheckNameAvailabilityResponse>;
  /**
   * Gets a Kusto cluster principalAssignment.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kusto cluster.
   * @param principalAssignmentName The name of the Kusto principalAssignment.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    clusterName: string,
    principalAssignmentName: string,
    options?: ClusterPrincipalAssignmentsGetOptionalParams,
  ): Promise<ClusterPrincipalAssignmentsGetResponse>;
  /**
   * Create a Kusto cluster principalAssignment.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kusto cluster.
   * @param principalAssignmentName The name of the Kusto principalAssignment.
   * @param parameters The Kusto cluster principalAssignment's parameters supplied for the operation.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    clusterName: string,
    principalAssignmentName: string,
    parameters: ClusterPrincipalAssignment,
    options?: ClusterPrincipalAssignmentsCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<ClusterPrincipalAssignmentsCreateOrUpdateResponse>,
      ClusterPrincipalAssignmentsCreateOrUpdateResponse
    >
  >;
  /**
   * Create a Kusto cluster principalAssignment.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kusto cluster.
   * @param principalAssignmentName The name of the Kusto principalAssignment.
   * @param parameters The Kusto cluster principalAssignment's parameters supplied for the operation.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    clusterName: string,
    principalAssignmentName: string,
    parameters: ClusterPrincipalAssignment,
    options?: ClusterPrincipalAssignmentsCreateOrUpdateOptionalParams,
  ): Promise<ClusterPrincipalAssignmentsCreateOrUpdateResponse>;
  /**
   * Deletes a Kusto cluster principalAssignment.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kusto cluster.
   * @param principalAssignmentName The name of the Kusto principalAssignment.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    clusterName: string,
    principalAssignmentName: string,
    options?: ClusterPrincipalAssignmentsDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Deletes a Kusto cluster principalAssignment.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the Kusto cluster.
   * @param principalAssignmentName The name of the Kusto principalAssignment.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    clusterName: string,
    principalAssignmentName: string,
    options?: ClusterPrincipalAssignmentsDeleteOptionalParams,
  ): Promise<void>;
}
