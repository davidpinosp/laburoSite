import axios from "axios";
import { ApplicantInt } from "../typescript/interfaces/AppInterface";

const getPostedJobsById = async (id: string) => {
  // get email and lookup all the available applications
  try {
    const result = await axios.get(
      `https://getuserjobsbyid-gi2cautoja-uc.a.run.app?id=${id}`
    );
    console.log(result);
    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

const getApplicantsById = async (id: string) => {
  try {
    const result = await axios.get(
      `https://getapplicantsbyid-gi2cautoja-uc.a.run.app?id=${id}`
    );
    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

const updateApplicantById = async (data: ApplicantInt) => {
  try {
    await axios.post(`https://updateapplicant-gi2cautoja-uc.a.run.app`, data);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    return false;
  }
};

export { getPostedJobsById, getApplicantsById, updateApplicantById };
