# @pontx/currencybeacon-rest

[Pontx Hub SDK guide](https://pontx.dev/en/sdks/currencybeacon-rest)

Type-safe TypeScript SDK and CLI for the CurrencyBeacon v1 REST API.

```bash
npm install @pontx/currencybeacon-rest
```

## SDK

```ts
import { createCurrencyBeaconClient } from "@pontx/currencybeacon-rest";

const client = createCurrencyBeaconClient({
  apiKey: process.env.PONTX_CURRENCYBEACON_API_KEY,
});

const rates = await client.latest({
  base: "USD",
  symbols: "EUR,GBP",
});
```

Use `authMode: "bearer"` to send the same caller-owned key through the
`Authorization: Bearer` header instead of the default query parameter.

## CLI

```bash
export PONTX_CURRENCYBEACON_API_KEY="..."
pontx-currencybeacon-rest call latest --base USD --symbols EUR,GBP --dry-run
```

The SDK and CLI connect directly to CurrencyBeacon. They do not proxy, cache,
persist, or display supplier responses, and keys are added only at request
execution time so dry-run output never includes them.
