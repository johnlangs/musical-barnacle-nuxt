import MongoDBClient from "~/lib/mongo"

export default defineEventHandler(async (event) => {
    let accounts = [];
    let totalBalance = 0;

    try {
        MongoDBClient.connect();

        const docs = await MongoDBClient.db(process.env.DB_NAME).collection(process.env.ACCOUNTS_COLL!).find().toArray();
        for (const doc of docs) {
            accounts.push({name: doc.name, account_id: doc.account_id, balance: doc.balances.current});
            totalBalance += Number(doc.balances.current);
        }
    } catch (err) {
        console.log(err);
    } finally {
        
    }

    return {
        balance: totalBalance,
        accounts: accounts
    }
})