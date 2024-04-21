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

export interface AppData {
  name: string;
  number: string;
  email: string;

  description: string;
}
