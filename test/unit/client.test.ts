import { afterEach, describe, expect, it, vi } from "vitest";
import currencyBeaconClient, {
  createCurrencyBeaconClient,
  currencyBeaconClient as namedClient,
} from "../../src/index";

describe("@pontx/currencybeacon-rest", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("exports the same default and named client", () => {
    expect(currencyBeaconClient).toBe(namedClient);
  });

  it("adds the caller-owned query credential only at fetch time", async () => {
    const payload = { meta: { code: 200 }, response: { base: "USD", rates: { EUR: 0.9 } } };
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(payload), {
      headers: { "content-type": "application/json" },
    }));
    vi.stubGlobal("fetch", fetchMock);

    const client = createCurrencyBeaconClient({ apiKey: "unit-test-key" });
    await expect(client.latest({ base: "USD", symbols: "EUR" })).resolves.toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.currencybeacon.com/v1/latest?base=USD&symbols=EUR&api_key=unit-test-key",
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("supports the documented bearer credential without placing the key in the URL", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ 0: { short_code: "AED" } }), {
      headers: { "content-type": "application/json" },
    }));
    vi.stubGlobal("fetch", fetchMock);

    const client = createCurrencyBeaconClient({ apiKey: "unit-test-key", authMode: "bearer" });
    await client.currencies();

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.currencybeacon.com/v1/currencies");
    expect(new Headers(init.headers).get("Authorization")).toBe("Bearer unit-test-key");
  });

  it("requires a key only when a request is executed and does not synthesize a common controller", async () => {
    const client = createCurrencyBeaconClient();
    await expect(client.latest({ base: "USD" })).rejects.toThrow("PONTX_CURRENCYBEACON_API_KEY");
    expect(() => (client as unknown as { common: unknown }).common).toThrow('API "common" not found');
  });
});
