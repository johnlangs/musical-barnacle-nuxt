import MongoDBClient from "~/lib/mongo"

export default defineEventHandler(async (event) => {
    let categories = 
    {
      "BANK_FEES"                 :0,
      "ENTERTAINMENT"             :0,
      "FOOD_AND_DRINK"            :0,
      "GENERAL_MERCHANDISE"       :0,
      "GENERAL_SERVICES"          :0,
      "GOVERNMENT_AND_NON_PROFIT" :0,
      "HOME_IMPROVEMENT"          :0,
      "INCOME"                    :0,
      "LOAN_PAYMENTS"             :0,
      "MEDICAL"                   :0,
      "PERSONAL_CARE"             :0,
      "RENT_AND_UTILITIES"        :0,
      "TRANSFER_IN"               :0,
      "TRANSFER_OUT"              :0,
      "TRANSPORTATION"            :0,
      "TRAVEL"                    :0
    }

    try {
        MongoDBClient.connect();

        const docs = await MongoDBClient.db(process.env.DB_NAME).collection(process.env.TRANSACTIONS_COLL!).find().toArray();
        for (const doc of docs) {
            if (typeof doc.personal_finance_category.primary === 'string') {
                categories[doc.personal_finance_category.primary as keyof typeof categories] += Number(doc.amount);
            }
        }
    } catch (err) {
        console.log(err);
    }

    return categories;
})