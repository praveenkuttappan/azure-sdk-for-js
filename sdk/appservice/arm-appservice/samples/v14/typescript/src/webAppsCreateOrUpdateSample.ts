/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Site, WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Description for Creates a new web, mobile, or API app in an existing resource group, or updates an existing app.
 *
 * @summary Description for Creates a new web, mobile, or API app in an existing resource group, or updates an existing app.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2023-01-01/examples/CloneWebApp.json
 */
async function cloneWebApp() {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const name = "sitef6141";
  const siteEnvelope: Site = {
    cloningInfo: {
      appSettingsOverrides: { setting1: "NewValue1", setting3: "NewValue5" },
      cloneCustomHostNames: true,
      cloneSourceControl: true,
      configureLoadBalancing: false,
      hostingEnvironment:
        "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/testrg456/providers/Microsoft.Web/hostingenvironments/aseforsites",
      overwrite: false,
      sourceWebAppId:
        "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/testrg456/providers/Microsoft.Web/sites/srcsiteg478",
      sourceWebAppLocation: "West Europe"
    },
    kind: "app",
    location: "East US"
  };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.beginCreateOrUpdateAndWait(
    resourceGroupName,
    name,
    siteEnvelope
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Description for Creates a new web, mobile, or API app in an existing resource group, or updates an existing app.
 *
 * @summary Description for Creates a new web, mobile, or API app in an existing resource group, or updates an existing app.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2023-01-01/examples/CreateOrUpdateWebApp.json
 */
async function createOrUpdateWebApp() {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const name = "sitef6141";
  const siteEnvelope: Site = {
    kind: "app",
    location: "East US",
    serverFarmId:
      "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/testrg123/providers/Microsoft.Web/serverfarms/DefaultAsp"
  };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.beginCreateOrUpdateAndWait(
    resourceGroupName,
    name,
    siteEnvelope
  );
  console.log(result);
}

async function main() {
  cloneWebApp();
  createOrUpdateWebApp();
}

main().catch(console.error);
