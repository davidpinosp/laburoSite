import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { LocationData } from "../../interface/LocationData";

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

interface Filters {
  fullTime?: boolean;
  inPerson?: boolean;
}

const getJobsByLocationAndPosition = async (
  location: LocationData,
  title: string,
  pageSize: number,
  filters?: Filters,
  lastDatePosted?: string,
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
      $or?: Array<
        | { datePosted: { $lt: string } }
        | { datePosted: string; _id: { $gt: ObjectId } }
      >;
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

    if (filters?.fullTime !== undefined) {
      query.fullTime = filters.fullTime;
    }

    if (filters?.inPerson !== undefined) {
      query.inPerson = filters.inPerson;
    }

    // Adding cursor-based pagination
    if (lastDatePosted) {
      query.$or = [
        { datePosted: { $lt: lastDatePosted } },
        { datePosted: lastDatePosted, _id: { $gt: new ObjectId(lastId) } },
      ];
    }

    const dblen = await col.countDocuments(query);

    const jobs = await col
      .find(query)
      .sort({ datePosted: -1, _id: 1 }) // Sort by datePosted (descending) and _id (ascending)
      .limit(pageSize)
      .toArray();

    return { jobs, length: dblen }; // Returns the jobs and includes the total number of matching jobs
  } catch (err) {
    console.error("An error occurred:", err);
    throw err; // Rethrow the error after logging
  } finally {
    await client.close();
  }
};

export default getJobsByLocationAndPosition;
