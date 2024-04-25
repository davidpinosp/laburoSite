import React from "react";
import Landing from "./pages/Landing";
import PostJob from "./pages/PostJob";
import ComingSoon from "./pages/ComingSoon";
import Jobs from "./pages/Jobs";
import JobDescription from "./pages/JobDescription";
import Applied from "./pages/Applied";

import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JobApply from "./pages/JobApply";
import AboutUs from "./pages/AboutUs";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactUs from "./pages/ContactUs";
import MessageSent from "./pages/MessageSent";

function App() {
  return (
    <div className="App" style={{ minHeight: "100vh" }}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/jobs" element={<Jobs />} />

          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/job-des" element={<JobDescription />} />
          <Route path="/job-des/job-apply" element={<JobApply />} />
          <Route path="/thank-you" element={<Applied />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/message-sent" element={<MessageSent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
