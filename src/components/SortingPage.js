import React, { useState } from "react";
import "./SortingPage.css";

const SortingPage = ({ handleAlgorithmClick }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");

  // Handles algorithm selection and executes the corresponding function
  const handleSelectAlgorithm = (algorithm) => {
    setSelectedAlgorithm(algorithm); // Set the selected algorithm name
    handleAlgorithmClick(algorithm); // Trigger the parent function for the specific algorithm
  };

  return (
    <div className="SortingPage">
      <div className="algorithm-selection">
        <h1>Select a Sorting Algorithm</h1>
        <div className="algorithm-buttons">
          <button onClick={() => handleSelectAlgorithm("bubbleSort")}>
            Bubble Sort
          </button>
          <button onClick={() => handleSelectAlgorithm("quickSort")}>
            Quick Sort
          </button>
          <button onClick={() => handleSelectAlgorithm("mergeSort")}>
            Merge Sort
          </button>
          <button onClick={() => handleSelectAlgorithm("selectionSort")}>
            Selection Sort
          </button>
          <button onClick={() => handleSelectAlgorithm("insertionSort")}>
            Insertion Sort
          </button>
          <button onClick={() => handleSelectAlgorithm("heapSort")}>
            Heap Sort
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortingPage;
