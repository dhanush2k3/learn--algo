import React, { useState } from "react";

const PathFindingControlPanel = ({
  setGraph,
  setStartNode,
  setEndNode,
  handleStartAlgorithm,
  isPaused,
  setIsPaused,
  handleReset,
}) => {
  const [startNode, setStartNodeValue] = useState("");
  const [endNode, setEndNodeValue] = useState("");

  const handleGenerateGraph = () => {
    setIsPaused(true); // Pause pathfinding when generating a new graph
    // Generate a graph (adjacency list) as an example
    const newGraph = new Map();
    newGraph.set("A", [
      ["B", 1],
      ["C", 4],
    ]);
    newGraph.set("B", [
      ["A", 1],
      ["C", 2],
      ["D", 5],
    ]);
    newGraph.set("C", [
      ["A", 4],
      ["B", 2],
      ["D", 1],
    ]);
    newGraph.set("D", [
      ["B", 5],
      ["C", 1],
    ]);
    setGraph(newGraph);
  };

  return (
    <div className="ControlPanel">
      <div className="control-row">
        <div className="control-item">
          <label htmlFor="startNode">Start Node:</label>
          <input
            type="text"
            id="startNode"
            value={startNode}
            onChange={(e) => setStartNodeValue(e.target.value)}
          />
        </div>

        <div className="control-item">
          <label htmlFor="endNode">End Node:</label>
          <input
            type="text"
            id="endNode"
            value={endNode}
            onChange={(e) => setEndNodeValue(e.target.value)}
          />
        </div>

        <div className="control-item">
          <button onClick={handleGenerateGraph}>Generate Graph</button>
        </div>
      </div>

      <div className="control-row">
        <div className="control-item">
          <button onClick={() => handleStartAlgorithm("dijkstra")}>
            Dijkstra's Algorithm
          </button>
        </div>
      </div>

      <div className="control-row">
        <div className="control-item">
          <button onClick={() => setIsPaused(!isPaused)}>
            {isPaused ? "Resume" : "Pause"}
          </button>
        </div>

        <div className="control-item">
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default PathFindingControlPanel;
