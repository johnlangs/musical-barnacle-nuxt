import { Products, CountryCode } from "plaid";
import PlaidClient from '~/lib/plaid';

export default defineEventHandler(async (event) => {
    try {
        const tokenResponse = await PlaidClient.linkTokenCreate({
            user: { client_user_id: "test" },
            client_name: "Plaid's Tiny Quickstart",
            language: "en",
            products: [Products.Auth, Products.Transactions],
            country_codes: [CountryCode.Us],
            redirect_uri: process.env.PLAID_SANDBOX_REDIRECT_URI,
        }); 
        return tokenResponse.data;
    } catch (err) {
        console.log(err)
        return err
    }
})