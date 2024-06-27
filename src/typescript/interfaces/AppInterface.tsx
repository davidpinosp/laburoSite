// applicant interface
export interface EmailApp {
  to: string;
  subject: string;
  html: string;
  name: string;
  number: string;
  email: string;
  date: Date;
  title: string;
}

export interface DBApp {
  name: string;
  number: string;
  email: string;
  date: Date;
  description: string;
  jobId: string;
}

export interface ApplicantInt {
  _id: string;
  name: string;
  email: string;
  number: string;
  description: string;
  date: Date;
  resumeUrl: string;
  jobId: string;
  liked: boolean;
}

export interface OptionsInt {
  value: any;
  label: string;
}
