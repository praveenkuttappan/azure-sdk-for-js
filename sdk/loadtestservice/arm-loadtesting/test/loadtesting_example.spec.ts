/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  env,
  Recorder,
  RecorderStartOptions,
  delay,
  isPlaybackMode,
} from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert } from "chai";
import { Context } from "mocha";
import { LoadTestClient } from "../src/loadTestClient";

const replaceableVariables: Record<string, string> = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  SUBSCRIPTION_ID: "azure_subscription_id"
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables
};

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("LoadTesting test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: LoadTestClient;
  let location: string;
  let resourceGroup: string;
  let loadTestName: string;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderOptions);
    subscriptionId = env.SUBSCRIPTION_ID || '';
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new LoadTestClient(credential, subscriptionId, recorder.configureClientOptions({}));
    location = "eastus";
    resourceGroup = "myjstest";
    loadTestName = "myLoadTest"
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("loadTests create test", async function () {
    const res = await client.loadTests.beginCreateOrUpdateAndWait(
      resourceGroup,
      loadTestName,
      {
        description: "This is new load test resource",
        location,
        tags: { team: "Dev Exp" }
      },
      testPollingOptions);
    assert.equal(res.name, loadTestName);
  });

  it("loadTests get test", async function () {
    const res = await client.loadTests.get(resourceGroup, loadTestName);
    assert.equal(res.name, loadTestName);
  });

  it("loadTests list test", async function () {
    const resArray = new Array();
    for await (let item of client.loadTests.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 1);
  });

  it("loadTests delete test", async function () {
    const resArray = new Array();
    const res = await client.loadTests.beginDeleteAndWait(resourceGroup, loadTestName)
    for await (let item of client.loadTests.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });
})