import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import fetchAdapter from "@haverstack/axios-fetch-adapter";

const config = new Configuration({
    basePath: PlaidEnvironments[process.env.PLAID_ENV!],
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
        "PLAID-SECRET": process.env.PLAID_SECRET,
        "Plaid-Version": "2020-09-14",
      },
      // adapter: fetchAdapter
    },
});

const PlaidClient = new PlaidApi(config);

export default PlaidClient;