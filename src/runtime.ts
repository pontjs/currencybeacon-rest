export const DEFAULT_BASE_URL = "https://api.currencybeacon.com/v1";
export const API_KEY_ENV = "PONTX_CURRENCYBEACON_API_KEY";
export const BASE_URL_ENV = "PONTX_CURRENCYBEACON_BASE_URL";
export const AUTH_MODE_ENV = "PONTX_CURRENCYBEACON_AUTH_MODE";

const runtimeEnv: Record<string, string | undefined> =
  typeof process === "undefined" ? {} : process.env;

export type CurrencyBeaconAuthMode = "query" | "bearer";

export type CurrencyBeaconRequestOptions = {
  apiKey?: string;
  authMode?: CurrencyBeaconAuthMode;
  baseUrl?: string;
  fetchImpl?: typeof fetch;
};

function requiredApiKey(apiKey?: string) {
  const resolved = apiKey ?? runtimeEnv[API_KEY_ENV];
  if (!resolved?.trim()) {
    throw new Error(`${API_KEY_ENV} is required to call CurrencyBeacon.`);
  }
  return resolved.trim();
}

function resolvedAuthMode(authMode?: CurrencyBeaconAuthMode): CurrencyBeaconAuthMode {
  const value = authMode ?? runtimeEnv[AUTH_MODE_ENV];
  if (value === undefined || value === "query") return "query";
  if (value === "bearer") return "bearer";
  throw new Error(`${AUTH_MODE_ENV} must be "query" or "bearer".`);
}

export function authorizedRequest(
  input: string,
  init: RequestInit,
  apiKey: string,
  authMode: CurrencyBeaconAuthMode,
) {
  if (authMode === "query") {
    const url = new URL(input);
    url.searchParams.set("api_key", apiKey);
    return { url: url.toString(), init };
  }
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${apiKey}`);
  return { url: input, init: { ...init, headers } };
}

async function decode(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";
  const body = contentType.includes("json") ? await response.json() : await response.text();
  if (!response.ok) {
    throw new Error(`CurrencyBeacon request failed with HTTP ${response.status}.`);
  }
  return body;
}

export async function requestCurrencyBeacon(
  input: string,
  init: RequestInit,
  options: CurrencyBeaconRequestOptions = {},
) {
  const apiKey = requiredApiKey(options.apiKey);
  const authMode = resolvedAuthMode(options.authMode);
  const baseUrl = options.baseUrl ?? runtimeEnv[BASE_URL_ENV] ?? DEFAULT_BASE_URL;
  const url = new URL(input, baseUrl);
  const authorized = authorizedRequest(url.toString(), init, apiKey, authMode);
  const fetchImpl = options.fetchImpl ?? fetch;
  return decode(await fetchImpl(authorized.url, authorized.init));
}

/** The generated CLI passes a relative URL and only attaches credentials at request execution time. */
export async function directCurrencyBeaconFetch(url: string, init: RequestInit) {
  return requestCurrencyBeacon(url, init);
}
