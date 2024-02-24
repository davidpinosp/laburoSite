import React from "react";
import Landing from "./pages/Landing";
import PostJob from "./pages/PostJob";
import ComingSoon from "./pages/ComingSoon";
import Jobs from "./pages/Jobs";
import JobDescription from "./pages/JobDescription";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/job-des" element={<JobDescription />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
