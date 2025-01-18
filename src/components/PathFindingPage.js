import React, { useState } from "react";
import PathFindingControlPanel from "./PathFindingControlPanel";
import PathfindingVisualization from "./PathfindingVisualization";
import "./PathFindingPage.css";

const PathFindingPage = () => {
  const [graph, setGraph] = useState(new Map());
  const [startNode, setStartNode] = useState("");
  const [endNode, setEndNode] = useState("");
  const [algorithm, setAlgorithm] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleStartAlgorithm = (algo) => {
    setIsPaused(false);
    setAlgorithm(algo);
  };

  const handleReset = () => {
    setIsPaused(true);
    setGraph(new Map());
    setAlgorithm(null);
  };

  return (
    <div className="PathFindingPage">
      <PathfindingVisualization
        graph={graph}
        startNode={startNode}
        endNode={endNode}
        algorithm={algorithm}
        isPaused={isPaused}
      />
      <PathFindingControlPanel
        setGraph={setGraph}
        setStartNode={setStartNode}
        setEndNode={setEndNode}
        handleStartAlgorithm={handleStartAlgorithm}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        handleReset={handleReset}
      />
    </div>
  );
};

export default PathFindingPage;
