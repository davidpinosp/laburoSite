import "firebase/firestore";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
const getJobsData = async (page: number) => {
  // get the first 25 jobs

  console.log("getting job data ..." + page);
  const jobs = collection(db, "job");
  //  get the latest 25 and display like that based on page
  const startAtDocument = 3 * page;
  const q = query(
    jobs,
    orderBy("datePosted"),
    startAfter(startAtDocument),
    limit(3)
  );

  const jobsSnapshot = await getDocs(q);
  const jobList = jobsSnapshot.docs.map((doc) => ({
    data: doc.data(),
    id: doc.id,
  }));
  console.log(jobList);
  return jobList;
};

const getJobsDataQuery = (query: string, page: number) => {
  // look for jobs that match the query string in the given page
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
  getJobsData,
  getJobsDataQuery,
  getJobPositionData,
  setJobData,
  getCollectionLength,
};
