import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { LocationData } from "../../interface/LocationData";

// const uri =
//   "mongodb+srv://support:SEBAS123sebas@cluster0.e9gwtvj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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

// Filters.ts
interface Filters {
  fullTime?: boolean;
  inPerson?: boolean;
}
const getJobsByLocationAndPosition = async (
  location: LocationData,
  title: string,
  pageSize: number,
  filters?: Filters,
  lastId?: string,
) => {
  try {
    await client.connect();
    const db = client.db("Laburo");
    const col = db.collection("job");

    // Define the query type
    interface Query {
      status: boolean;
      $text?: { $search: string };
      "location.city"?: string;
      "location.country"?: string;

      fullTime?: boolean;
      inPerson?: boolean;
      _id?: { $gt: ObjectId };
    }

    const query: Query = {
      status: true,
    };

    if (title) {
      query.$text = { $search: title };
    }
    // Constructing the query based on provided fields
    if (location && location.city && location.country) {
      query["location.city"] = location.city;
      query["location.country"] = location.country;
    }

    // Adding cursor-based pagination
    if (filters?.fullTime !== undefined) {
      query["fullTime"] = filters.fullTime;
    }

    if (filters?.inPerson !== undefined) {
      query["inPerson"] = filters.inPerson;
    }

    if (lastId) {
      query._id = { $gt: new ObjectId(lastId) };
    }
    const dblen = await col.countDocuments(query);

    const jobs = await col
      .find(query)
      .sort({ datePosted: -1 }) // Sort by datePosted
      .limit(pageSize)
      .toArray();

    return { jobs, length: dblen }; // Returns the jobs and includes the most recent jobs at the top
  } catch (err) {
    console.error("An error occurred:", err);
    throw err; // Rethrow the error after logging
  } finally {
    await client.close();
  }
};

export default getJobsByLocationAndPosition;
