import { MongoClient, ServerApiVersion } from "mongodb";
import { LocationData } from "../../interface/LocationData";
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

// const getDbLength = async () => {
//   try {
//     await client.connect();
//     console.log("conected");
//     const db = client.db("Laburo");
//     const col = db.collection("job");
//     const size = await col.countDocuments();
//     console.log(size);
//   } catch (err) {
//     console.error("An error occurred:", err);
//     throw err; // Rethrow the error after logging
//   } finally {
//     await client.close();
//     console.log("connection closed");
//   }
// };

const getDbLengthJobsByLocationAndPosition = async (
  location: LocationData,
  title: string,
) => {
  try {
    await client.connect();
    const db = client.db("Laburo");
    const col = db.collection("job");

    let query: {
      [key: string]:
        | LocationData
        | string
        | number
        | Date
        | boolean
        | (
            | { "location.city": string; "location.country": string }
            | { title: string }
          )[];
    } = {};

    // Constructing the query based on provided fields
    if (location.city && location.country && title) {
      query = {
        $and: [
          {
            "location.city": location.city,
            "location.country": location.country,
          }, // Assuming location structure
          { title: title },
        ],
      };
    } else if (location.city && location.country) {
      query["location.city"] = location.city;
      query["location.country"] = location.country;
    } else if (title) {
      query.title = title;
    }
    query["status"] = true;

    return await col.countDocuments(query);
  } catch (err) {
    console.log("error connecting to db" + err);
    throw err;
  } finally {
    await client.close();
    console.log("connection closed");
  }
};
export { getDbLengthJobsByLocationAndPosition };
