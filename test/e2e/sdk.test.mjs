import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { promisify } from "node:util";
import { fileURLToPath, pathToFileURL } from "node:url";

const execFileAsync = promisify(execFile);
const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const cli = resolve(repositoryRoot, "dist/bin/cli.cjs");

async function listen(server) {
  await new Promise((resolveListen) => server.listen(0, "127.0.0.1", resolveListen));
  const address = server.address();
  assert(address && typeof address === "object");
  return address.port;
}

test("the built SDK completes a direct CurrencyBeacon request with a caller key", async (context) => {
  const requests = [];
  const payload = { meta: { code: 200 }, response: { base: "USD", rates: { EUR: 0.9 } } };
  const server = createServer((request, response) => {
    requests.push({ url: request.url, authorization: request.headers.authorization });
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify(payload));
  });
  const port = await listen(server);
  context.after(() => new Promise((resolveClose) => server.close(resolveClose)));

  const esm = await import(`${pathToFileURL(resolve(repositoryRoot, "dist/index.mjs")).href}?e2e=${Date.now()}`);
  const client = esm.createCurrencyBeaconClient({
    apiKey: "e2e-fixture-key",
    baseUrl: `http://127.0.0.1:${port}`,
  });
  const result = await client.latest({ base: "USD", symbols: "EUR" });
  assert.deepEqual(result, payload);
  assert.deepEqual(requests, [{ url: "/latest?base=USD&symbols=EUR&api_key=e2e-fixture-key", authorization: undefined }]);

  const require = createRequire(import.meta.url);
  const cjs = require(resolve(repositoryRoot, "dist/index.js"));
  assert.equal(cjs.default, cjs.currencyBeaconClient);
});

test("the built CLI hides credentials in dry runs and calls a caller-selected endpoint", async (context) => {
  const { stdout: dryRunStdout, stderr: dryRunStderr } = await execFileAsync(process.execPath, [
    cli, "call", "latest", "--base", "USD", "--symbols", "EUR", "--dry-run",
  ], {
    cwd: repositoryRoot,
    env: { ...process.env, PONTX_CURRENCYBEACON_API_KEY: "cli-fixture-key" },
  });
  const dryRun = `${dryRunStdout}${dryRunStderr}`;
  assert.match(dryRun, /Dry run - request not sent/);
  assert.doesNotMatch(dryRun, /cli-fixture-key|api_key=/i);

  const requests = [];
  const payload = { meta: { code: 200 }, response: { base: "USD", rates: { EUR: 0.9 } } };
  const server = createServer((request, response) => {
    requests.push(request.url);
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify(payload));
  });
  const port = await listen(server);
  context.after(() => new Promise((resolveClose) => server.close(resolveClose)));

  const { stdout } = await execFileAsync(process.execPath, [
    cli, "call", "latest", "--base", "USD", "--symbols", "EUR",
  ], {
    cwd: repositoryRoot,
    env: {
      ...process.env,
      PONTX_CURRENCYBEACON_API_KEY: "cli-fixture-key",
      PONTX_CURRENCYBEACON_BASE_URL: `http://127.0.0.1:${port}`,
    },
  });
  assert.match(stdout, /EUR/);
  assert.deepEqual(requests, ["/latest?base=USD&symbols=EUR&api_key=cli-fixture-key"]);
});

test("the npm package contains SDK declarations and CLI metadata", async () => {
  const { stdout } = await execFileAsync("npm", ["pack", "--dry-run", "--json"], {
    cwd: repositoryRoot,
  });
  const [packed] = JSON.parse(stdout);
  const files = new Set(packed.files.map((file) => file.path));
  for (const expected of [
    "README.md",
    "LICENSE",
    "dist/index.d.ts",
    "dist/index.js",
    "dist/index.mjs",
    "dist/bin/api-lock.json",
    "dist/bin/cli.cjs",
  ]) {
    assert(files.has(expected), `missing npm artifact: ${expected}`);
  }
});
