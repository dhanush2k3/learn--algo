import React, { useState } from "react";
import Pathfinding from "./PathfindingVisualization"; // Dijkstra's component
import AStarPathfinding from "./AStarPathfindingVisualization"; // A* component
import "./PathFindingPage.css"; // Your existing styles

const PathfindingPage = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(""); // Tracks which algorithm is selected

  const handleSelectAlgorithm = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  return (
    <div className="pathfinding-page">
      {selectedAlgorithm === "" ? (
        // Algorithm selection view
        <div className="algorithm-selection">
          <h1>Choose an Algorithm</h1>
          <div className="algorithm-buttons">
            <button onClick={() => handleSelectAlgorithm("dijkstra")}>
              Dijkstra's Algorithm
            </button>
            <button onClick={() => handleSelectAlgorithm("astar")}>
              A* Algorithm
            </button>
          </div>
        </div>
      ) : (
        // Show the visualization for the selected algorithm
        <div className="visualization">
          <h1>
            {selectedAlgorithm === "dijkstra"
              ? "Dijkstra's Algorithm"
              : "A* Algorithm"}{" "}
            Visualization
          </h1>
          {selectedAlgorithm === "dijkstra" ? (
            <Pathfinding /> // Dijkstra's visualization
          ) : (
            <AStarPathfinding /> // A* visualization
          )}
          <button
            onClick={() => setSelectedAlgorithm("")}
            className="back-button"
          >
            Back to Selection
          </button>
        </div>
      )}
    </div>
  );
};

export default PathfindingPage;
