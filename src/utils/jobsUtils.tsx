import "firebase/firestore";
import { db } from "../firebase";
import {
  DocumentData,
  DocumentSnapshot,
  addDoc,
  collection,
  doc,
  endAt,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { ExpandMore } from "@mui/icons-material";
interface LocationData {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

const getJobsByLocationAndPosition = async (
  location?: LocationData,
  position?: string,
  setLength?: React.Dispatch<React.SetStateAction<number>>,
  lastIndex?: DocumentSnapshot<DocumentData, DocumentData>,
  limitVal: number = 3
) => {
  try {
    const jobsCollection = collection(db, "job");
    let q = query(jobsCollection);

    if (location) {
      q = query(
        q,
        where("location.city", "==", location.city),
        where("location.country", "==", location.country)
      );
    }

    if (position) {
      // q = query(q, where("position", "==", position));

      q = query(
        q,

        orderBy("title"),
        orderBy("datePosted", "desc"),
        startAt(position),
        endAt(position + "\uf8ff")
      );
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

const getMoreJobs = (
  type: string,
  amount: number,
  lastSnapshot: any,
  location?: LocationData,
  position?: string
) => {
  // get n more jobs for all,position,location,both
  // remember to check if quanitity of displayed jobs is equal to total then this function shouldnt run
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

      console.log("Document data:", data);
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
    const docRef = await addDoc(collection(db, "application"), data);
    console.log("Document written with ID: ", docRef.id);
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

// use places api to store place and coordinates
// for retrieval use autocomplete and also get coordinates so that then we can query db using geojson

export {
  getJobPositionData,
  setJobData,
  getCollectionLength,
  getJobSnapshot,
  getJobsByLocationAndPosition,
};
