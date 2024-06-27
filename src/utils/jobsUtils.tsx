import "firebase/firestore";
import { db } from "../firebase";
import {
  DocumentData,
  DocumentSnapshot,
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import axios from "axios";
import { JobInt } from "../typescript/interfaces/JobInterface";

interface LocationData {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}
// ToDo : improve search algorithm

const getJobsByLocationAndPosition = async (
  location?: LocationData,
  position?: string,
  setLength?: React.Dispatch<React.SetStateAction<number>>,
  lastIndex?: DocumentSnapshot<DocumentData, DocumentData>,
  limitVal: number = 20
) => {
  try {
    const jobsCollection = collection(db, "job");
    let q = query(jobsCollection);
    q = query(q, where("status", "==", true));
    if (location) {
      q = query(
        q,
        where("location.city", "==", location.city),
        where("location.country", "==", location.country)
      );
    }

    if (position) {
      position = position.charAt(0).toUpperCase();
      q = query(
        q,
        where("title", ">=", position),
        where("title", "<=", position + "\uf8ff")
      );

      //   q = query(
      //     q,

      //     orderBy("title"),
      //     orderBy("datePosted", "desc"),
      //     startAt(position),
      //     endAt(position + "\uf8ff")
      //   );
    }

    const snapshot = await getCountFromServer(q);
    if (setLength) {
      setLength(snapshot.data().count);
    }

    if (lastIndex) {
      q = query(q, startAfter(lastIndex));
    }

    q = query(q, limit(limitVal));
    const jobsSnapshot = await getDocs(q);
    // get length

    const jobsData = jobsSnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    return jobsData;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

const getJobSnapshot = async (id: string) => {
  // get the snapshot based on id

  const documentRef = doc(db, "job", id);
  try {
    const documentSnapshot = await getDoc(documentRef);

    return documentSnapshot;
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
};

const getJobPositionData = async (id: string) => {
  const documentRef = doc(db, "job", id);

  try {
    const documentSnapshot = await getDoc(documentRef);

    if (documentSnapshot.exists()) {
      // Document exists, extract data
      const data = {
        id: documentSnapshot.id,
        data: documentSnapshot.data(),
      };

      return data;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
};

const setJobData = async (data: {
  email: string; // look for jobs that match the query string in the given page
  number: string;
  description: string;
  date: Date;
  jobId: string;
}) => {
  try {
    await addDoc(collection(db, "application"), data);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const getCollectionLength = async () => {
  const collectionRef = collection(db, "job");

  try {
    const snapshot = await getDocs(collectionRef);
    const collectionLength = snapshot.size;
    return collectionLength;
  } catch (error) {
    console.error("Error getting collection length:", error);
    throw error;
  }
};

// ----------refactor ---------

const getJobs = async (
  location?: LocationData,
  position?: string,
  lastIndex?: string,
  lastDatePosted?: string,
  filters?: {},
  pageSize?: number,
  setLength?: React.Dispatch<React.SetStateAction<number>>
) => {
  // return array of jobs with last one with id

  let filteredObject;

  if (filters) {
    filteredObject = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => value !== undefined)
    );
  }

  //

  const reqData = {
    location: location || {
      city: "",
      country: "",
      latitude: 0,
      longitude: 0,
    },
    title: position,
    pageSize: pageSize,
    lastId: lastIndex,
    lastDatePosted: lastDatePosted,
    filters: filteredObject || {},
  };
  const result = await axios.post(
    "https://getjobs-gi2cautoja-uc.a.run.app",
    reqData
  );

  if (setLength) {
    setLength(result.data.length);
  }
  return result.data.results;
};

const getDbLength = async (location?: LocationData, position?: string | "") => {
  const reqData = {
    location: location || {
      city: "",
      country: "",
      latitude: 0,
      longitude: 0,
    },
    title: position,
  };
  const result = await axios.post(
    "https://getdblength-gi2cautoja-uc.a.run.app",
    reqData
  );
  return result.data.results;
};

const getJobById = async (jobId: string) => {
  const data = {
    id: jobId,
  };
  try {
    const result = await axios.post(
      "https://findjob-gi2cautoja-uc.a.run.app",
      data
    );

    return result.data.results;
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
};

const updateDbStatusDescription = async (jobData: JobInt, withID?: boolean) => {
  try {
    if (withID) {
      await axios.post(
        "https://updatejobpostbyid-gi2cautoja-uc.a.run.app",
        jobData
      );
      console.log("updating with _id");
    } else {
      await axios.post(
        "https://editjobstatusanddescription-gi2cautoja-uc.a.run.app",
        jobData
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const getJobByEditKey = async (jobId: string) => {
  try {
    const result = await axios.post(
      "https://findjobbyeditkey-gi2cautoja-uc.a.run.app",
      { editKey: jobId }
    );

    return result.data.results;
  } catch (error) {
    console.log(error);
  }
};

// use places api to store place and coordinates
// for retrieval use autocomplete and also get coordinates so that then we can query db using geojson

export {
  getJobPositionData,
  setJobData,
  getCollectionLength,
  getJobSnapshot,
  getJobsByLocationAndPosition,
  getJobs,
  getDbLength,
  getJobById,
  getJobByEditKey,
  updateDbStatusDescription,
};
