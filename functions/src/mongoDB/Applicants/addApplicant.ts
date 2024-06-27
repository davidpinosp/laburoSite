import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { ApplicantInt } from "../../interface/ApplicantInt";

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

const addApplicant = async (data: ApplicantInt) => {
  try {
    await client.connect();
    // make the status false here so it cant be sent as true from frontend.
    const db = client.db("Laburo");
    const col = db.collection("applicant");

    await col.insertOne(data);
    const jobId = data.jobId;
    if (jobId) {
      await db
        .collection("job")
        .updateOne({ _id: new ObjectId(jobId) }, { $inc: { applicants: 1 } });
    }
  } catch (err) {
    console.error("An error occurred:", err);
    throw err; // Rethrow the error after logging
  } finally {
    await client.close();
  }
};

export { addApplicant };
