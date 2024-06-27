import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { ApplicantInt } from "../../interface/ApplicantInt";

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

const updateApplicantById = async (applicant: ApplicantInt) => {
  try {
    await client.connect();

    const db = client.db("Laburo");
    const col = db.collection("applicant");

    return await col.updateOne(
      { _id: new ObjectId(applicant._id) },
      { $set: { liked: !applicant.liked } }, // Use $set to update the liked field
    );
  } catch (err) {
    console.error("An error occurred:", err);
    throw err; // Rethrow the error after logging
  } finally {
    await client.close();
  }
};

export { updateApplicantById };
