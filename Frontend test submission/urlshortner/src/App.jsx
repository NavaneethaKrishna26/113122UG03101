import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UrlShorter from "./UrlShorter";
import RedirectPage from "./RedirectPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UrlShorter />} />
        <Route path="/:shortCode" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
