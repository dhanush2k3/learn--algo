import React, { useState } from "react";
import BFSVisualization from "./BFSVisualization"; // BFS component
import DFSVisualization from "./DFSVisualization"; // DFS component
import "./GraphTraversalPage.css"; // Styles for Graph Traversal page

const GraphTraversalPage = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(""); // Tracks the selected algorithm

  const handleSelectAlgorithm = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  return (
    <div className="graph-traversal-page">
      {selectedAlgorithm === "" ? (
        // Algorithm selection view
        <div className="algorithm-selection">
          <h1>Choose a Graph Traversal Algorithm</h1>
          <div className="algorithm-buttons">
            <button onClick={() => handleSelectAlgorithm("bfs")}>
              Breadth-First Search (BFS)
            </button>
            <button onClick={() => handleSelectAlgorithm("dfs")}>
              Depth-First Search (DFS)
            </button>
          </div>
        </div>
      ) : (
        // Show the visualization for the selected algorithm
        <div className="visualization">
          <h1>
            {selectedAlgorithm === "bfs"
              ? "Breadth-First Search (BFS)"
              : "Depth-First Search (DFS)"}{" "}
            Visualization
          </h1>
          {selectedAlgorithm === "bfs" ? (
            <BFSVisualization /> // BFS visualization
          ) : (
            <DFSVisualization /> // DFS visualization
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

export default GraphTraversalPage;
