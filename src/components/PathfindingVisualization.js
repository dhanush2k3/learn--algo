import React from "react";
import Dijkstra from "./Dijkstra"; // Import Dijkstra component
// Import other pathfinding algorithms as needed

const PathfindingVisualization = ({
  graph,
  startNode,
  endNode,
  algorithm,
  isPaused,
}) => {
  return (
    <div className="PathfindingVisualization">
      {/* Add your visualization rendering logic here */}
      {algorithm === "dijkstra" && (
        <Dijkstra
          graph={graph}
          startNode={startNode}
          endNode={endNode}
          isPaused={isPaused}
        />
      )}
      {/* Add conditional rendering for other algorithms */}
    </div>
  );
};

export default PathfindingVisualization;
