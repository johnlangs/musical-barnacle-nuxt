import MongoDBClient from "~/lib/mongo";

export default defineEventHandler(async (event) => {
    let transactions = [];

    try {
      await MongoDBClient.connect();
      const docs = await MongoDBClient.db(process.env.DB_NAME).collection(process.env.TRANSACTIONS_COLL!).find().toArray();

      for (const doc of docs) {
        let account = await MongoDBClient.db(process.env.DB_NAME).collection(process.env.ACCOUNTS_COLL!).findOne({account_id: {$eq: doc.account_id}});
    
        transactions.push({
          date: doc.date,
          amount: doc.amount,
          account: account!.name,
          account_id: doc.account_id,
          category: doc.personal_finance_category.primary,
          merchant_name: doc.merchant_name
        });
      }
    } catch (err) {
        console.log(err);
    }

    return {
        number_of_transactions: transactions.length,
        transactions: transactions
    }
})