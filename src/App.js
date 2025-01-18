import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SortingPage from "./components/SortingPage";
import PathFindingPage from "./components/PathFindingPage";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sorting" element={<SortingPage />} />
          <Route path="/path-finding" element={<PathFindingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
