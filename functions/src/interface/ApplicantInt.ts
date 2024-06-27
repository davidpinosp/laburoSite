import { ObjectId } from "mongodb";

export interface ApplicantInt {
  name: string;
  email: string;
  number: string;
  description: string;
  date: Date;
  resumeUrl: string;
  jobId: string;
  _id?: ObjectId | undefined;
  liked?: boolean;
}
