import React from "react";
import { useNavigate } from "react-router-dom";
import "./SortingPage.css";

const SortingPage = () => {
  const navigate = useNavigate();

  // Handles the selection and triggers navigation to the specific algorithm
  const handleSelectAlgorithm = (algorithm) => {
    // Save the selected algorithm name
    localStorage.setItem("selectedAlgorithm", algorithm);

    if (algorithm === "bubbleSort") {
      navigate("/sorting/bubble-sort");
    } else if (algorithm === "quickSort") {
      navigate("/sorting/quick-sort");
    } else if (algorithm === "mergeSort") {
      navigate("/sorting/merge-sort"); // Added Merge Sort navigation
    } else if (algorithm === "selectionSort") {
      navigate("/sorting/selection-sort");
    } else if (algorithm === "insertionSort") {
      navigate("/sorting/insertion-sort");
    } else if (algorithm === "heapSort") {
      navigate("/sorting/heap-sort");
    }
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
