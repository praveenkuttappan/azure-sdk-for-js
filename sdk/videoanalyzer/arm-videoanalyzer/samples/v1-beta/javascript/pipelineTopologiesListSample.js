/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { VideoAnalyzerManagementClient } = require("@azure/arm-videoanalyzer");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Retrieves a list of pipeline topologies that have been added to the account, if any, along with their JSON representation.
 *
 * @summary Retrieves a list of pipeline topologies that have been added to the account, if any, along with their JSON representation.
 * x-ms-original-file: specification/videoanalyzer/resource-manager/Microsoft.Media/preview/2021-11-01-preview/examples/pipeline-topology-list.json
 */
async function listAllPipelineTopologies() {
  const subscriptionId =
    process.env["VIDEOANALYZER_SUBSCRIPTION_ID"] || "591e76c3-3e97-44db-879c-3e2b12961b62";
  const resourceGroupName = process.env["VIDEOANALYZER_RESOURCE_GROUP"] || "testrg";
  const accountName = "testaccount2";
  const top = 2;
  const options = { top };
  const credential = new DefaultAzureCredential();
  const client = new VideoAnalyzerManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.pipelineTopologies.list(resourceGroupName, accountName, options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  listAllPipelineTopologies();
}

main().catch(console.error);