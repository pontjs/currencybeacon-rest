import { createGracefulClient } from "@pontx/sdk";
import type { APIs } from "./apis/currencyBeaconRest/apis";
import { specMeta } from "./apis/currencyBeaconRest/apiMeta";
import {
  DEFAULT_BASE_URL,
  requestCurrencyBeacon,
  type CurrencyBeaconRequestOptions,
} from "./runtime";

export type CurrencyBeaconClientOptions = CurrencyBeaconRequestOptions;

export function createCurrencyBeaconClient(
  options: CurrencyBeaconClientOptions = {},
) {
  return createGracefulClient<APIs>({
    pontxSpecMeta: specMeta as never,
    baseUrl: options.baseUrl ?? DEFAULT_BASE_URL,
    baseRequestFn: (url, init) => requestCurrencyBeacon(url, init, options),
  });
}

const currencyBeaconClient = createCurrencyBeaconClient();

export { currencyBeaconClient };
export default currencyBeaconClient;
