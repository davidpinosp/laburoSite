import React from "react";
import Landing from "./pages/Landing";
import PostJob from "./pages/PostJob";
import ComingSoon from "./pages/ComingSoon";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/jobs" element={<ComingSoon />} />
          <Route path="/post-job" element={<PostJob />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
