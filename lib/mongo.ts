import { MongoClient, ServerApiVersion } from "mongodb";

const MongoDBClient = new MongoClient(process.env.MONGODB_URI!, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

export default MongoDBClient;
