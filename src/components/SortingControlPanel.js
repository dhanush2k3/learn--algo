import React, { useState } from "react";

const SortingControlPanel = ({
  setArray,
  setSpeed,
  handleStartAlgorithm,
  isPaused,
  setIsPaused,
  handleReset,
}) => {
  const [arraySize, setArraySize] = useState(10);
  const [speedValue, setSpeedValue] = useState(500);

  const handleGenerateArray = () => {
    setIsPaused(true); // Pause sorting when generating a new array
    const newArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
  };

  const handleSpeedChange = (e) => {
    const newSpeed = e.target.value;
    setSpeedValue(newSpeed);
    setSpeed(newSpeed);
  };

  return (
    <div className="ControlPanel">
      <div className="control-row">
        <div className="control-item">
          <label htmlFor="arraySize">Array Size:</label>
          <input
            type="range"
            id="arraySize"
            min="5"
            max="30"
            value={arraySize}
            onChange={(e) => setArraySize(e.target.value)}
          />
          <span>{arraySize}</span>
        </div>

        <div className="control-item">
          <label htmlFor="speed">Speed:</label>
          <input
            type="range"
            id="speed"
            min="50"
            max="1000"
            value={speedValue}
            onChange={handleSpeedChange}
          />
        </div>

        <div className="control-item">
          <button onClick={handleGenerateArray}>Generate Array</button>
        </div>
      </div>

      <div className="control-row">
        <div className="control-item">
          <button onClick={() => handleStartAlgorithm("bubbleSort")}>
            Bubble Sort
          </button>
        </div>

        <div className="control-item">
          <button onClick={() => handleStartAlgorithm("quickSort")}>
            Quick Sort
          </button>
        </div>

        <div className="control-item">
          <button onClick={() => handleStartAlgorithm("mergeSort")}>
            Merge Sort
          </button>
        </div>

        <div className="control-item">
          <button onClick={() => handleStartAlgorithm("selectionSort")}>
            Selection Sort
          </button>
        </div>

        <div className="control-item">
          <button onClick={() => handleStartAlgorithm("insertionSort")}>
            Insertion Sort
          </button>
        </div>

        <div className="control-item">
          <button onClick={() => handleStartAlgorithm("heapSort")}>
            Heap Sort
          </button>
        </div>
      </div>

      <div className="control-row">
        <div className="control-item">
          <button onClick={() => setIsPaused(!isPaused)}>
            {isPaused ? "Resume" : "Pause"}
          </button>
        </div>

        <div className="control-item">
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default SortingControlPanel;
