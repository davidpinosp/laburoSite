import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../assets/styles/postjobs.css";
import PostJobPill from "../components/PostJobPill";
import CreateJob from "../components/create-job/CreateJob";
import ValidateJob from "../components/ValidateJob";
import PayJob from "../components/PayJob";
import Footer from "../components/Footer";
import { JobInt } from "../typescript/interfaces/JobInterface";
import { postJob } from "../utils/jobDescription";
import PaymentPage from "../components/create-job/PaymentPage";
import { redirect } from "react-router-dom";
function PostJob() {
  const [job, setJob] = useState<JobInt>();
  const [step, setStep] = useState(1);
  const def = {
    title: "",
    company: "",
    datePosted: new Date(),
    description: "",
    location: {
      city: "",
      country: "",
      latitude: 0,
      longitude: 0,
    },
    inPerson: true,
    fullTime: true,
    recieveViaEmail: true,
    recieveEmail: "",
    imageURL: "",
    status: false,
  };

  const Step1 = () => {
    return (
      <React.Fragment>
        <PostJobPill step={1} />
        <CreateJob setJob={setJob} job={job || def} setStep={setStep} />
      </React.Fragment>
    );
  };

  const Step2 = () => {
    return (
      <React.Fragment>
        <PostJobPill step={2} />
        <ValidateJob job={job || def} setStep={setStep} />
      </React.Fragment>
    );
  };

  const Step3 = () => {
    return (
      <React.Fragment>
        <PostJobPill step={3} />
        <PaymentPage setStep={setStep} job={job || def} />
      </React.Fragment>
    );
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setStep(3);
      console.log("payment done");
    }
  }, []);
  return (
    <div
      className="w100 flx flx-col flx-center"
      style={{ padding: "0px 10px" }}
    >
      <Navbar scrollPast={true} />
      <div className="skip-navbar-margin postjob-container ">
        {/* top bar  */}

        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}

        {/* second bar with content */}
      </div>
      <Footer type={2} />
    </div>
  );
}

export default PostJob;
