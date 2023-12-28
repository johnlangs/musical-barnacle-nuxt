import PlaidClient from "~/lib/plaid";

export default defineEventHandler(async (event) => {
    try {
        const reqData = await readBody(event)
        const token = reqData.public_token
        const exchangeResponse = await PlaidClient.itemPublicTokenExchange({
            public_token: token,
        });
    }
    catch (err) {
        console.log(err)
    }
})