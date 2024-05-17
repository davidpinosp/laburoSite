import { MongoClient, ServerApiVersion } from "mongodb";
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

const getJobByEditKey = async (editKey: string) => {
  try {
    await client.connect();

    const db = client.db("Laburo");
    const col = db.collection("job");
    const query = { editKey: editKey };
    console.log(query);
    const result = await col.findOne(query);
    return result;
  } catch (err) {
    console.error("An error occurred:", err);
    throw err; // Rethrow the error after logging
  } finally {
    await client.close();
  }
};

const updateJobPostOrStatus = async (data: JobInt) => {
  try {
    await client.connect();

    const db = client.db("Laburo");
    const col = db.collection("job");
    const query = { editKey: data.editKey };
    console.log(query);
    const update = {
      $set: { status: data.status, description: data.description },
    };
    await col.updateOne(query, update);
  } catch (err) {
    console.error("An error occurred:", err);
    throw err; // Rethrow the error after logging
  } finally {
    await client.close();
  }
};

export { updateJobPostOrStatus, getJobByEditKey };
