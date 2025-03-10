import React, { useState } from "react";
import "./AStarTutorial.css";

const AStarTutorial = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Introduction",
      content: [
        "A* Algorithm is a graph search algorithm that finds the shortest path from a start node to an end node.",
        "It combines the strengths of Dijkstra's Algorithm and heuristics to improve efficiency.",
        "Widely used in AI pathfinding, robotics, and video games for finding the shortest path between two points."
      ],
    },
    {
      title: "Why Use A* Algorithm",
      content: [
        "Efficiently finds the shortest path by combining cost and heuristics.",
        "Balances accuracy and speed, making it ideal for large, complex graphs.",
        "Often used in applications that require real-time decisions, such as GPS systems and video games."
      ],
    },
    {
      title: "Step-by-Step Process",
      content: [
        "1. Initialize the graph with all nodes set to Infinity costs, except for the start node (gCost=0).",
        "2. Compute the heuristic (hCost), which estimates the cost to the end node.",
        "3. Set fCost = gCost + hCost.",
        "4. Explore neighbors of the current node and update their fCost.",
        "5. Choose the node with the smallest fCost and mark it as the new current node.",
        "6. Repeat until the end node is reached or the open list is empty.",
        "7. Backtrack to reconstruct the shortest path."
      ],
    },
    {
      title: "How to Use It in the Grid",
      content: [
        "1. Use the 'Set Start Node' and 'Set End Node' buttons to define the start and end points.",
        "2. Add walls to the grid by clicking and dragging over cells to create obstacles.",
        "3. Click 'Run A* Algorithm' to visualize the algorithm's search process.",
        "4. Observe the visited nodes (orange) and the shortest path (blue).",
        "5. Use the 'Reset' button to clear the grid and try again."
      ],
    },
    {
      title: "What Are Nodes?",
      content: [
        "Nodes represent grid cells. Each cell is a node with position and costs (gCost, hCost, fCost).",
        "Start nodes (green) and end nodes (red) mark the start and goal of the pathfinding process.",
        "Walls (black) block the path, forcing the algorithm to explore alternative routes.",
        "Visited nodes (orange) are checked, while the shortest path nodes (blue) highlight the result."
      ],
    },
    {
      title: "Search Type & Complexity",
      content: [
        "A* performs a weighted heuristic search with fCost = gCost + hCost.",
        "Time Complexity: O(E log V) for large graphs with priority queues.",
        "Space Complexity: O(V) for storing visited nodes and the open list."
      ],
    },
  ];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-box">
        <h2>{tutorialSteps[currentStep].title}</h2>
        <ol>
          {tutorialSteps[currentStep].content.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ol>
        <div className="tutorial-buttons">
          <button onClick={handleBack} disabled={currentStep === 0}>
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === tutorialSteps.length - 1}
          >
            Next
          </button>
          <button onClick={onClose} className="close-button">
            Close Tutorial
          </button>
        </div>
      </div>
    </div>
  );
};

export default AStarTutorial;
