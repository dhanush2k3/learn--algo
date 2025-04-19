import React from "react";

const PathFindingControlPanel = ({
  generateGrid,
  startNode,
  endNode,
  setVisualizing,
  grid,
}) => {
  const handleStart = () => {
    if (!startNode || !endNode) {
      alert("Please set valid start and end nodes!");
      return;
    }
    setVisualizing(true);
  };

  return (
    <div className="ControlPanel">
      <button onClick={generateGrid}>Generate Grid</button>
      <button onClick={handleStart}>Start Dijkstra</button>
    </div>
  );
};

export default PathFindingControlPanel;
