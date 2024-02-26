import "firebase/firestore";
import { db } from "../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
const getJobsData = async (page: number) => {
  // get the first 25 jobs

  console.log("getting job data ...");
  const jobs = collection(db, "job");
  //   get the latest 25 and display like that based on page
  //   const q = query(jobsCollection, orderBy('timestamp'), limit(25));
  const jobsSnapshot = await getDocs(jobs);
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

// use places api to store place and coordinates
// for retrieval use autocomplete and also get coordinates so that then we can query db using geojson

export { getJobsData, getJobsDataQuery, getJobPositionData };
