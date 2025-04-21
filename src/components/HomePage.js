import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="HomePage">
      <h1>Welcome to Algorithm visualizer</h1>
      <div className="buttons">
        <Link to="/sorting">
          <button className="home-button">Sorting</button>
        </Link>
        <Link to="/path-finding">
          <button className="home-button">Path Finding</button>
        </Link>
        <Link to="/graph-traversal">
          <button className="home-button">Graph Traversal</button>
        </Link>
        <Link to="/arrays">
          <button className="home-button">Arrays</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
