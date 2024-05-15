import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { JobInt } from "../../interface/JobInt";
// import { LocationData } from "../../interface/LocationData";
// import { JobInt } from "../interface/JobInt";
// const uri = process.env.MONGODB_URI ||"";
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

const addJobPost = async (data: JobInt) => {
  try {
    await client.connect();
    console.log(data);
    const db = client.db("Laburo");
    const col = db.collection("job");

    const result = await col.insertOne(data);
    return result.insertedId.toString();
  } catch (err) {
    console.error("An error occurred:", err);
    throw err; // Rethrow the error after logging
  } finally {
    await client.close();
  }
};

const updateJopPostStatus = async (id: string) => {
  try {
    await client.connect();

    const db = client.db("Laburo");
    const col = db.collection("job");
    const query = { _id: new ObjectId(id) };
    const update = { $set: { status: true } };
    await col.updateOne(query, update);
  } catch (err) {
    console.error("An error occurred:", err);
    throw err; // Rethrow the error after logging
  } finally {
    await client.close();
  }
};

export { addJobPost, updateJopPostStatus };
