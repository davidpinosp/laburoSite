import "firebase/firestore";
import { db } from "../firebase";
import { JobInt } from "../typescript/interfaces/JobInterface";
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

const postJob = async (data: JobInt) => {
  // function to create a job document in the job collection
  try {
    await addDoc(collection(db, "job"), data);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export { postJob };
