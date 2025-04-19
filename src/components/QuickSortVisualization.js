import React, { useState } from "react";
import "./QuickSortVisualization.css";

const QuickSortVisualization = () => {
  const [array, setArray] = useState([]);
  const [pivot, setPivot] = useState(null); // Tracks the pivot value
  const [highlightedIndices, setHighlightedIndices] = useState([]); // Tracks indices being compared
  const [swapIndices, setSwapIndices] = useState([]); // Tracks indices being swapped
  const [comments, setComments] = useState([]); // Stores step-by-step comments

  const generateArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
    setPivot(null); // Reset pivot
    setHighlightedIndices([]); // Reset highlights
    setSwapIndices([]); // Reset swaps
    setComments([]); // Reset comments
  };

  const handleCustomInput = (e) => {
    const inputValues = e.target.value.split(",").map((num) => parseInt(num.trim(), 10));
    setArray(inputValues);
    setPivot(null);
    setHighlightedIndices([]);
    setSwapIndices([]);
    setComments([]);
  };

  const renderArray = (arr) => {
    return (
      <div className="array-display">
        {arr.map((value, index) => (
          <div
            key={index}
            className={`index-box ${
              swapIndices.includes(index) ? "swapping" : highlightedIndices.includes(index) ? "highlight" : ""
            } ${value === pivot ? "pivot" : ""}`}
          >
            <div className="index">{index}</div>
            <div className="value">{value}</div>
          </div>
        ))}
      </div>
    );
  };

  const startSorting = async () => {
    if (array.length === 0 || pivot === null) return;

    const arrCopy = [...array];
    const pivotIndex = arrCopy.indexOf(pivot);
    if (pivotIndex === -1) {
      alert("Pivot value is not valid. Select a valid pivot from the array.");
      return;
    }

    [arrCopy[pivotIndex], arrCopy[arrCopy.length - 1]] = [
      arrCopy[arrCopy.length - 1],
      arrCopy[pivotIndex],
    ]; // Move pivot to the end
    setArray([...arrCopy]); // Update visualization
    await quickSort(arrCopy, 0, arrCopy.length - 1);
  };

  const quickSort = async (arr, start, end) => {
    if (start >= end) return;

    const pivotIndex = await partition(arr, start, end);
    await quickSort(arr, start, pivotIndex - 1);
    await quickSort(arr, pivotIndex + 1, end);
  };

  const partition = async (arr, start, end) => {
    const pivotValue = arr[end];
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
      setHighlightedIndices([i, pivotIndex]); // Highlight current comparing indices
      setComments((prev) => [
        ...prev,
        `Comparing index ${i} (value: ${arr[i]}) with pivot index ${end} (value: ${pivotValue}).`,
      ]);

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Pause for animation

      if (arr[i] < pivotValue) {
        setComments((prev) => [
          ...prev,
          `Swapping index ${i} (value: ${arr[i]}) with index ${pivotIndex} (value: ${arr[pivotIndex]}).`,
        ]);
        setSwapIndices([i, pivotIndex]); // Trigger swapping animation
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Pause for swap visualization
        [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]]; // Perform the swap
        setArray([...arr]); // Update visualization
        setSwapIndices([]); // Clear swap indices
        pivotIndex++;
      }
    }

    setComments((prev) => [
      ...prev,
      `Moving pivot index ${end} (value: ${pivotValue}) to its correct position at index ${pivotIndex}.`,
    ]);
    setSwapIndices([pivotIndex, end]); // Highlight pivot swap
    await new Promise((resolve) => setTimeout(resolve, 1500));
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]]; // Final swap for pivot
    setArray([...arr]); // Update visualization
        setSwapIndices([]); // Clear swap indices
    return pivotIndex;
  };

  return (
    <div className="quick-sort-page">
      <div className="quick-sort-container">
        <h2>Quick Sort Visualization</h2>
        <div className="controls">
          <input
            type="text"
            placeholder="Enter numbers separated by commas"
            onChange={handleCustomInput}
          />
          <button onClick={generateArray}>Generate Random Array</button>
          <select
            onChange={(e) => setPivot(parseInt(e.target.value, 10))}
            disabled={array.length === 0}
          >
            <option value="">Select Pivot</option>
            {array.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
          <button onClick={startSorting}>Start Sorting</button>
        </div>
        {array.length > 0 && renderArray(array)}
        <div className="comments">
          <h3>Step-by-Step Process:</h3>
          {comments.map((comment, index) => (
            <p key={index}>{comment}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickSortVisualization;
