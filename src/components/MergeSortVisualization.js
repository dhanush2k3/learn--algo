import React, { useState, useEffect } from "react"; // Added useEffect for response time
import "./MergeSortVisualization.css";
import MergeSortTutorials from "./MergeSortTutorials"; // Import the tutorial component

const MergeSortVisualization = () => {
  const [showTutorial, setShowTutorial] = useState(true); // Control tutorial visibility
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [executionTime, setExecutionTime] = useState(null); // Track execution time
  const [memoryUsage, setMemoryUsage] = useState(null); // Track memory usage
  const [responseTime, setResponseTime] = useState(null); // Track response time

  useEffect(() => {
    // Measure UI rendering response time
    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      setResponseTime(endTime - startTime);
    };
  }, [array, steps]); // Recalculate response time when array or steps update

  const handleCloseTutorial = () => {
    setShowTutorial(false); // Hide the tutorial when the Close button is clicked
  };

  const generateArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
    setSteps([]);
  };

  const mergeSort = async (arr, indices, start, end) => {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);

    // Measure memory usage during the split step
    const memoryBeforeSplit = window.performance.memory.usedJSHeapSize;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSteps((prev) => [
      ...prev,
      {
        type: "split",
        explanation: `Splitting array [${arr.slice(start, end + 1).join(", ")}] into Left: [${arr.slice(start, mid + 1).join(", ")}] and Right: [${arr.slice(mid + 1, end + 1).join(", ")}].`,
        parent: [...arr.slice(start, end + 1)],
        indices: [...indices.slice(start, end + 1)],
        left: [...arr.slice(start, mid + 1)],
        leftIndices: [...indices.slice(start, mid + 1)],
        right: [...arr.slice(mid + 1, end + 1)],
        rightIndices: [...indices.slice(mid + 1, end + 1)],
      },
    ]);
    const memoryAfterSplit = window.performance.memory.usedJSHeapSize;
    setMemoryUsage((memoryAfterSplit - memoryBeforeSplit) / 1024); // Calculate memory consumed during split step

    await mergeSort(arr, indices, start, mid);
    await mergeSort(arr, indices, mid + 1, end);
    await merge(arr, indices, start, mid, end);
  };

  const merge = async (arr, indices, start, mid, end) => {
    let left = arr.slice(start, mid + 1);
    let leftIndices = indices.slice(start, mid + 1);
    let right = arr.slice(mid + 1, end + 1);
    let rightIndices = indices.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;
    const mergedIndices = [];

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        indices[k] = leftIndices[i];
        mergedIndices.push(leftIndices[i]);
        i++;
      } else {
        arr[k] = right[j];
        indices[k] = rightIndices[j];
        mergedIndices.push(rightIndices[j]);
        j++;
      }
      k++;
    }

    while (i < left.length) {
      arr[k] = left[i];
      indices[k] = leftIndices[i];
      mergedIndices.push(leftIndices[i]);
      i++;
      k++;
    }

    while (j < right.length) {
      arr[k] = right[j];
      indices[k] = rightIndices[j];
      mergedIndices.push(rightIndices[j]);
      j++;
      k++;
    }

    // Add merge step
    const memoryBeforeMerge = window.performance.memory.usedJSHeapSize;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSteps((prev) => [
      ...prev,
      {
        type: "merge",
        explanation: `Merging Left: [${left.join(", ")}] and Right: [${right.join(", ")}].\nResult: [${arr.slice(start, end + 1).join(", ")}].`,
        parent: [...arr.slice(start, end + 1)],
        indices: [...mergedIndices],
      },
    ]);
    const memoryAfterMerge = window.performance.memory.usedJSHeapSize;
    setMemoryUsage((memoryAfterMerge - memoryBeforeMerge) / 1024); // Update memory usage
  };

  const startSorting = async () => {
    if (sorting || array.length === 0) return;
    setSorting(true);

    const startTime = performance.now(); // Measure execution start
    let arrCopy = [...array];
    let indices = Array.from({ length: array.length }, (_, index) => index); // Preserve original indices
    await mergeSort(arrCopy, indices, 0, arrCopy.length - 1);
    const endTime = performance.now(); // Measure execution end
    setExecutionTime(endTime - startTime); // Calculate and store execution time

    setSorting(false);
  };

  const renderArray = (arr, indices) => {
    return (
      <div className="array-box">
        {arr.map((value, index) => (
          <div className="index-box" key={indices[index]}>
            <div className="index">{indices[index]}</div>
            <div className="value">{value}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="merge-sort-page">
      {showTutorial && <MergeSortTutorials onClose={handleCloseTutorial} />} {/* Tutorials */}
      <div className="merge-sort-container">
        <h2>Merge Sort Visualization</h2>
        <div className="controls">
          <input
            type="text"
            placeholder="Enter numbers (e.g., 8,3,5,2)"
            onChange={(e) => {
              const values = e.target.value.split(",").map((n) => parseInt(n.trim(), 10));
              setArray(values);
              setSteps([]);
            }}
          />
          <button onClick={generateArray}>Generate Random Array</button>
          <button onClick={startSorting} disabled={sorting}>
            Start Sorting
          </button>
        </div>

        <div className="array-display">
          {array.length > 0 && <div>{renderArray(array, Array.from({ length: array.length }, (_, i) => i))}</div>}
        </div>

        <div className="steps">
          {steps.map((step, index) => (
            <div key={index} className={`step ${step.type}`}>
              <p className="step-comment">{step.explanation}</p>
              {step.type === "split" && (
                <div className="hierarchy">
                  <div className="parent">{renderArray(step.parent, step.indices)}</div>
                  <div className="lines">
                    <div className="connection-arrow"></div>
                  </div>
                  <div className="children">
                    <div className="child">{renderArray(step.left, step.leftIndices)}</div>
                    <div className="child">{renderArray(step.right, step.rightIndices)}</div>
                  </div>
                </div>
              )}
              {step.type === "merge" && (
                <div className="merge-result">
                  <div className="connection-arrow"></div>
                  <div className="merged">{renderArray(step.parent, step.indices)}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Display additional information */}
        <div className="metrics">
          <p>Execution Time: {executionTime ? `${executionTime.toFixed(2)} ms` : "N/A"}</p>
          <p>Memory Usage: {memoryUsage ? `${memoryUsage.toFixed(2)} KB` : "N/A"}</p>
          <p>UI Response Time: {responseTime ? `${responseTime.toFixed(2)} ms` : "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default MergeSortVisualization;
