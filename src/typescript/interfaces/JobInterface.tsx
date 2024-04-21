export interface JobInt {
  title: string;
  company: string;
  datePosted: Date;
  description: string;
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  inPerson: boolean;
  fullTime: boolean;
  recieveViaEmail: boolean;
  recieveEmail: string;
  imageURL?: string | undefined;
  status: boolean;
}
