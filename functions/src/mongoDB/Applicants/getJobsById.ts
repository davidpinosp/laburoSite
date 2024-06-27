import { MongoClient, ServerApiVersion } from "mongodb";
// import { ApplicantInt } from "../../interface/ApplicantInt";

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

const getJobByID = async (id: string) => {
  try {
    await client.connect();
    // make the status false here so it cant be sent as true from frontend.
    const db = client.db("Laburo");
    const col = db.collection("job");

    return await col
      .find({ $or: [{ recieveEmail: id }, { userId: id }] })
      .sort({ status: -1, datePosted: -1 })
      .toArray();
  } catch (err) {
    console.error("An error occurred:", err);
    throw err; // Rethrow the error after logging
  } finally {
    await client.close();
  }
};

export { getJobByID };
