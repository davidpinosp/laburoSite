import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
// import { LocationData } from "../../interface/LocationData";
// import { JobInt } from "../interface/JobInt";
// const uri = process.env.MONGODB_URI as string;
const uri = process.env.MONGODB_URI;
let client: MongoClient;
if (uri) {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,

      deprecationErrors: true,
    },
  });
}

const getPostByID = async (docId: string) => {
  try {
    await client.connect();
    const db = client.db("Laburo");
    const col = db.collection("job");
    const obj = new ObjectId(docId);
    const result = await col.findOne({ _id: obj });
    return result;
  } catch (err) {
    console.error("An error occurred:", err);
    throw err; // Rethrow the error after logging
  } finally {
    await client.close();
  }
};

export default getPostByID;
