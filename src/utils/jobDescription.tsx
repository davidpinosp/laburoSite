import "firebase/firestore";

import { JobInt } from "../typescript/interfaces/JobInterface";

import axios from "axios";

const postJob = async (data: JobInt) => {
  // function to create a job document in the job collection
  try {
    // await addDoc(collection(db, "job"), data);
    await axios.post("https://postjob-gi2cautoja-uc.a.run.app", data);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export { postJob };
