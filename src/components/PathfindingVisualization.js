import React, { useState, useEffect } from "react";
import { dijkstra, getShortestPath } from "./Dijkstra"; // Import Dijkstra logic
import Tutorial from "./Tutorial"; // Import Dijkstra Tutorial
import "./PathfindingVisualization.css";
import { useNavigate } from "react-router-dom";

const Pathfinding = () => {
  const ROWS = 20; // Number of rows in the grid
  const COLS = 50; // Number of columns in the grid

  const createNode = (row, col) => ({
    row,
    col,
    isStart: false,
    isEnd: false,
    isWall: false,
    isVisited: false,
    distance: Infinity,
    previousNode: null,
  });

  const initializeGrid = () => {
    const grid = [];
    for (let row = 0; row < ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < COLS; col++) {
        currentRow.push(createNode(row, col));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  const [grid, setGrid] = useState(initializeGrid());
  const [startNode, setStartNode] = useState({ row: 5, col: 5 });
  const [endNode, setEndNode] = useState({ row: 15, col: 45 });
  const [mouseDown, setMouseDown] = useState(false);
  const [isSelectingStart, setIsSelectingStart] = useState(false);
  const [isSelectingEnd, setIsSelectingEnd] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true); // Toggle tutorial visibility
  const [result, setResult] = useState(""); // Display the result
  const navigate = useNavigate();

  // Resets the entire grid to its initial state
  const handleReset = () => {
    const newGrid = initializeGrid(); // Create a fresh grid
    newGrid[startNode.row][startNode.col].isStart = true;
    newGrid[endNode.row][endNode.col].isEnd = true;

    setGrid(newGrid); // Set the new grid
    setResult(""); // Clear the result
    document.querySelectorAll(".node").forEach((node) => {
      node.className = "node"; // Reset all node classes
    });
  };

  // Updates the grid when start or end nodes are updated
  useEffect(() => {
    const newGrid = initializeGrid();
    newGrid[startNode.row][startNode.col].isStart = true;
    newGrid[endNode.row][endNode.col].isEnd = true;
    setGrid(newGrid);
  }, [startNode, endNode]);

  const toggleWall = (row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if (!node.isStart && !node.isEnd) {
      node.isWall = !node.isWall;
    }
    setGrid(newGrid);
  };

  const handleMouseDown = (row, col) => {
    if (isSelectingStart) {
      setStartNode({ row, col });
      setIsSelectingStart(false);
    } else if (isSelectingEnd) {
      setEndNode({ row, col });
      setIsSelectingEnd(false);
    } else {
      toggleWall(row, col);
    }
    setMouseDown(true);
  };

  const handleMouseEnter = (row, col) => {
    if (mouseDown && !isSelectingStart && !isSelectingEnd) {
      toggleWall(row, col);
    }
  };

  const handleMouseUp = () => {
    setMouseDown(false);
  };

  const visualizeDijkstra = () => {
    const visitedNodesInOrder = dijkstra(grid, grid[startNode.row][startNode.col], grid[endNode.row][endNode.col]);
    const shortestPath = getShortestPath(grid[endNode.row][endNode.col]);

    if (!shortestPath || shortestPath.length === 0) {
      alert("No valid path found!");
      return;
    }

    animateAlgorithm(visitedNodesInOrder, shortestPath);
    displayResult(shortestPath);
  };

  const animateAlgorithm = (visitedNodes, shortestPath) => {
    visitedNodes.forEach((node, i) => {
      setTimeout(() => {
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) {
          // Preserve start and end node styles
          if (node.row === startNode.row && node.col === startNode.col) {
            element.className = "node node-start";
          } else if (node.row === endNode.row && node.col === endNode.col) {
            element.className = "node node-end";
          } else {
            element.className = "node node-visited";
          }
        }
      }, 10 * i);
    });

    setTimeout(() => {
      shortestPath.forEach((node, i) => {
        setTimeout(() => {
          const element = document.getElementById(`node-${node.row}-${node.col}`);
          if (element) {
            // Preserve start and end node styles
            if (node.row === startNode.row && node.col === startNode.col) {
              element.className = "node node-start";
            } else if (node.row === endNode.row && node.col === endNode.col) {
              element.className = "node node-end";
            } else {
              element.className = "node node-shortest-path";
            }
          }
        }, 50 * i);
      });
    }, 10 * visitedNodes.length);
  };

  const displayResult = (shortestPath) => {
    const startNodeNumber = `(${startNode.row}, ${startNode.col})`;
    const endNodeNumber = `(${endNode.row}, ${endNode.col})`;
    const pathCoordinates = shortestPath.map(node => `(${node.row}, ${node.col})`).join(" → ");

    setResult(
      <div className="result-success">
        <p><strong>Shortest Path Found!</strong></p>
        <p><span>Start Node:</span> {startNodeNumber}</p>
        <p><span>End Node:</span> {endNodeNumber}</p>
        <p><span>Path:</span> {pathCoordinates}</p>
        <p><span>Path Length:</span> {shortestPath.length - 1} steps</p>
      </div>
    );
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div>
      {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
      <div className="header">
        <p><strong>Start Node:</strong> ({startNode.row}, {startNode.col})</p>
        <p><strong>End Node:</strong> ({endNode.row}, {endNode.col})</p>
      </div>
      <div className="button-panel">
        <button onClick={() => setIsSelectingStart(true)}>Set Start Node</button>
        <button onClick={() => setIsSelectingEnd(true)}>Set End Node</button>
        <button onClick={visualizeDijkstra}>Run Dijkstra's Algorithm</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleBack}>Back to Selection</button>
      </div>
      <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((node, nodeIdx) => {
              const { row, col, isStart, isEnd, isWall } = node;
              return (
                <div
                  key={nodeIdx}
                  id={`node-${row}-${col}`}
                  className={`node ${
                    isStart
                      ? "node-start"
                      : isEnd
                      ? "node-end"
                      : isWall
                      ? "node-wall"
                      : ""
                  }`}
                  onMouseDown={() => handleMouseDown(row, col)}
                  onMouseEnter={() => handleMouseEnter(row, col)}
                  onMouseUp={handleMouseUp}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
      {result && <div className="result">{result}</div>}
    </div>
  );
};

export default Pathfinding;
