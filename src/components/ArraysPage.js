import React, { useState } from "react";
import LinkedListVisualization from "./LinkedListVisualization";
import StackVisualization from "./StackVisualization";
import QueueVisualization from "./QueueVisualization";
import "./ArraysPage.css";

const ArraysPage = () => {
  const [selectedStructure, setSelectedStructure] = useState("");

  const handleSelectStructure = (structure) => {
    setSelectedStructure(structure);
  };

  return (
    <div className="arrays-page">
      {selectedStructure === "" ? (
        <div className="structure-selection">
          <h1>Choose a Data Structure</h1>
          <div className="structure-buttons">
            <button
              onClick={() => handleSelectStructure("linked-list")}
              className="action-button"
            >
              Linked List
            </button>
            <button
              onClick={() => handleSelectStructure("stack")}
              className="action-button"
            >
              Stack
            </button>
            <button
              onClick={() => handleSelectStructure("queue")}
              className="action-button"
            >
              Queue
            </button>
          </div>
        </div>
      ) : (
        <div className="visualization">
          <h1>
            {selectedStructure === "linked-list"
              ? "Linked List Visualization"
              : selectedStructure === "stack"
              ? "Stack Visualization"
              : "Queue Visualization"}
          </h1>
          {selectedStructure === "linked-list" ? (
            <LinkedListVisualization />
          ) : selectedStructure === "stack" ? (
            <StackVisualization />
          ) : (
            <QueueVisualization />
          )}
          <button
            onClick={() => setSelectedStructure("")}
            className="action-button"
          >
            Back to Selection
          </button>
        </div>
      )}
    </div>
  );
};

export default ArraysPage;
