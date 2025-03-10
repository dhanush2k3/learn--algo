import React, { useState } from "react";
import "./Tutorial.css";

const Tutorial = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Introduction",
      content: "Dijkstra's Algorithm is a pathfinding algorithm used to find the shortest path between nodes in a graph. It guarantees the shortest path in graphs with non-negative weights and is widely used in GPS systems, AI pathfinding, and network routing.",
    },
    {
      title: "Why We Use Dijkstra's Algorithm",
      content:
        "We use Dijkstra's Algorithm because it provides the shortest path with accurate results. It's efficient, reliable, and applicable in many real-world scenarios, such as traffic navigation, logistics, and communication networks.",
    },
    {
      title: "Step-by-Step Process",
      content: `
1. Initialize the graph with all nodes set to a tentative distance of Infinity, except for the start node, which is set to 0.
2. Set the start node as the current node. Mark it as visited.
3. Update the distances of its unvisited neighbors.
4. Select the unvisited node with the smallest tentative distance and make it the new current node.
5. Repeat until the end node is visited or no more nodes are left.
6. Backtrack to construct the shortest path.`,
    },
    {
      title: "How to Use It in the Grid",
      content: `
1. Set the start and end nodes using the respective buttons.
2. Add walls by clicking and dragging on the grid to create obstacles.
3. Run the algorithm by clicking on 'Run Dijkstra's Algorithm'.
4. Observe the visualization as it finds the shortest path.
5. Reset the grid to try different configurations.`,
    },
    {
      title: "What Are Nodes?",
      content:
        "Nodes represent points on the grid. Each square or cell is a node. Start and end nodes are marked green and red respectively, while walls are black. Visited nodes turn green, and the shortest path is highlighted in blue.",
    },
    {
      title: "Search Type & Complexity",
      content:
        "Dijkstra's Algorithm performs a weighted breadth-first search. It has a time complexity of O(V^2) in its basic form, and O(V + E log V) when using a priority queue. The space complexity is O(V) for storing distances and visited nodes.",
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
        <p>{tutorialSteps[currentStep].content}</p>
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

export default Tutorial;
