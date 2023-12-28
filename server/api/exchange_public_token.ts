import { Collection, Document, MongoClient } from "mongodb";
import { RemovedTransaction, Transaction } from "plaid";
import MongoDBClient from "~/lib/mongo";
import PlaidClient from "~/lib/plaid";

export default defineEventHandler(async (event) => {
    try {
        const reqData = await readBody(event)
        const token = reqData.public_token
        const exchangeResponse = await PlaidClient.itemPublicTokenExchange({
            public_token: token,
        });
        await MongoDBClient.db(process.env.DB_NAME).collection(process.env.TOKENS_COLL!).insertOne(exchangeResponse.data);

        const balanceResponse = await PlaidClient.accountsBalanceGet({
            access_token: exchangeResponse.data.access_token,
        });
        for (const account of balanceResponse.data.accounts) {
            await MongoDBClient.db(process.env.DB_NAME).collection(process.env.ACCOUNTS_COLL!).insertOne(account);
        }

        const transactionResponse = await PlaidClient.transactionsSync({
            access_token: exchangeResponse.data.access_token,
            options: {include_personal_finance_category: true}
        });
        await updateTransactionsDb(
            MongoDBClient, 
            process.env.DB_NAME!, 
            process.env.TRANSACTIONS_COLL!, 
            transactionResponse.data.added,
            transactionResponse.data.modified,
            transactionResponse.data.removed
        )
    }
    catch (err) {
        console.log(err)
    }
})

/**
 * Update a transaction collection given arrays of added, modified, and removed transactions
 * @param {import("mongodb").MongoClient} client 
 * @param {string} database
 * @param {string} collection 
 * @param {Array<import("plaid").Transaction>} added  
 * @param {Array<import("plaid").Transaction>} modified 
 * @param {Array<import("plaid").Transaction>} deleted 
 */
async function updateTransactionsDb(client: MongoClient, database: string, collection: string, added: Transaction[], modified: Transaction[], removed: RemovedTransaction[])
{

    await client.connect();
    const coll = client.db(database).collection(collection);    

    // Insert transaction Docs that have marked as so by the sync
    if (added.length > 0)
      await addTransactions(coll, added).catch(console.dir);

    // Modify transaction Docs that have marked as so by the sync
    if (modified.length > 0)
      await modifyTransactions(coll, modified).catch(console.dir);

    // Delete transaction Docs that have marked as so by the sync
    if (removed.length > 0)
      await removeTransactions(coll, removed).catch(console.dir);
}

/**
 * Add transactions to a collection
 * @param {Collection<Document>} coll
 * @param {Array<import("plaid").Transaction>} added
 */
async function addTransactions(coll: Collection<Document>, added: Transaction[])
{
  const result = await coll.insertMany(added);
  if (result.insertedCount === added.length)
  {
    console.log(`Added ${result.insertedCount} transactions to ${coll.namespace}`);
  }
  else
  {
    console.log(`Failed to add ${added.length - result.insertedCount} transactions in ${coll.namespace}`);
  }
}

/**
 * Modify transactions in a collection
 * @param {Collection<Document>} coll
 * @param {Array<import("plaid").Transaction>} modified
 */
async function modifyTransactions(coll: Collection<Document>, modified: Transaction[])
{
  const result = await coll.updateMany(modified, {}, {});
  if (result.modifiedCount === modified.length)
  {
    console.log(`Modified ${result.modifiedCount} transactions in ${coll.namespace}`);
  }
  else
  {
    console.log(`Failed to modify ${modified.length - result.modifiedCount} transactions in ${coll.namespace}`);
  }
}

/**
 * Remove transactions from a collection
 * @param {Collection<Document>} coll
 * @param {Array<import("plaid").Transaction>} removed
 */
async function removeTransactions(coll: Collection<Document>, removed: RemovedTransaction[])
{
  const result = await coll.deleteMany(removed);
  if (result.deletedCount === removed.length)
  {
    console.log(`Removed ${result.deletedCount} transactions from ${coll.namespace}`);
  }
  else
  {
    console.log(`Failed to remove ${removed.length - result.deletedCount} transactions from ${coll.namespace}`);
  }
}