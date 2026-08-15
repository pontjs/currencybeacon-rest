import { runCLI } from "pontx/sdk-cli";
import { directCurrencyBeaconFetch } from "./src/runtime";

export default runCLI({
  name: "pontx-currencybeacon-rest",
  executeApi: {
    baseURL: "https://api.currencybeacon.com/v1",
    fetchFn: directCurrencyBeaconFetch,
  },
});
