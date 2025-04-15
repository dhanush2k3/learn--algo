import React, { useState, useEffect, useRef } from "react";
import BubbleSortTutorial from "./BubbleSortTutorial";
import "./BubbleSortVisualization.css";

const BubbleSortVisualization = () => {
  const [array, setArray] = useState([]);
  const [customInput, setCustomInput] = useState("");
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(500); // Default medium speed for sorting
  const [comments, setComments] = useState("");
  const [showControls, setShowControls] = useState(false); // Toggle for custom user controls
  const [showTutorial, setShowTutorial] = useState(true);

  // Performance Metrics
  const [executionTime, setExecutionTime] = useState(null); // Track execution time
  const [memoryUsage, setMemoryUsage] = useState(null); // Track memory usage
  const [responseTime, setResponseTime] = useState(null); // Track UI response time

  const sortingPaused = useRef(false); // Ref to track pause state
  const currentSpeed = useRef(speed); // Ref to track dynamic speed changes

  useEffect(() => {
    generateRandomArray(); // Generate a random array on initial load

    // Measure load time for UI components
    const startResponseTime = performance.now();
    return () => {
      const endResponseTime = performance.now();
      setResponseTime((endResponseTime - startResponseTime).toFixed(2));
    };
  }, []);

  useEffect(() => {
    // Update the speed ref dynamically when the slider is adjusted
    currentSpeed.current = speed;
  }, [speed]);

  // Generate a random array (15–20 elements)
  const generateRandomArray = () => {
    const newArray = Array.from(
      { length: Math.floor(Math.random() * 6) + 15 }, // Random size between 15 and 20
      () => Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    setComments(`Generated a random array: [${newArray.join(", ")}]`);
  };

  // Handle custom user input for the array
  const handleCustomInput = () => {
    const inputArray = customInput.split(",").map((num) => parseInt(num.trim()));
    if (inputArray.some(isNaN)) {
      setComments("Invalid input. Please enter numbers separated by commas.");
      return;
    }
    setArray(inputArray);
    setComments("Custom array set successfully.");
  };

  // Sleep function with dynamic pause and speed handling
  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Bubble Sort function with colors, pause, resume, adjustable speed, and comments
  const bubbleSort = async () => {
    setIsSorting(true);
    sortingPaused.current = false; // Ensure sorting is not paused initially
    setComments("Starting Bubble Sort...");
    const bars = document.getElementsByClassName("bar");
    const arrayCopy = [...array];

    const startExecutionTime = performance.now(); // Start execution time measurement
    const memoryBeforeSorting = window.performance.memory?.usedJSHeapSize || 0; // Memory before sorting

    for (let i = 0; i < arrayCopy.length - 1; i++) {
      for (let j = 0; j < arrayCopy.length - 1 - i; j++) {
        // Highlight the bars being compared with different colors
        bars[j].style.backgroundColor = "orange"; // First element being compared
        bars[j + 1].style.backgroundColor = "purple"; // Second element being compared
        setComments(`Comparing index ${j} (${arrayCopy[j]}) and index ${j + 1} (${arrayCopy[j + 1]}).`);

        // Pause handling
        while (sortingPaused.current) {
          await sleep(50); // Wait until pause is lifted
        }

        await sleep(currentSpeed.current);

        if (arrayCopy[j] > arrayCopy[j + 1]) {
          setComments(`Swapping index ${j} (${arrayCopy[j]}) and index ${j + 1} (${arrayCopy[j + 1]}).`);

          // Highlight swapping elements
          bars[j].style.backgroundColor = "red"; // Swapping color
          bars[j + 1].style.backgroundColor = "red";

          // Swap the values in the array
          [arrayCopy[j], arrayCopy[j + 1]] = [arrayCopy[j + 1], arrayCopy[j]];

          // Update the heights of the bars to reflect the swap
          bars[j].style.height = `${arrayCopy[j] * 5}px`;
          bars[j + 1].style.height = `${arrayCopy[j + 1] * 5}px`;
          bars[j].innerText = `${arrayCopy[j]}`;
          bars[j + 1].innerText = `${arrayCopy[j + 1]}`;

          await sleep(currentSpeed.current);
        }

        // Reset bar colors after comparison
        bars[j].style.backgroundColor = "blue"; // Default unsorted color
        bars[j + 1].style.backgroundColor = "blue";
      }

      // Mark the sorted bar
      bars[arrayCopy.length - 1 - i].style.backgroundColor = "green"; // Sorted color
    }

    // Mark all bars as sorted
    for (let i = 0; i < arrayCopy.length; i++) {
      bars[i].style.backgroundColor = "green";
    }

    const endExecutionTime = performance.now(); // End execution time measurement
    const memoryAfterSorting = window.performance.memory?.usedJSHeapSize || 0; // Memory after sorting

    setExecutionTime((endExecutionTime - startExecutionTime).toFixed(2)); // Calculate execution time
    setMemoryUsage(((memoryAfterSorting - memoryBeforeSorting) / 1024).toFixed(2)); // Memory usage in KB

    setArray(arrayCopy);
    setComments("Bubble Sort completed!");
    setIsSorting(false);
  };

  // Pause the sorting process
  const pauseSorting = () => {
    sortingPaused.current = true;
    setIsPaused(true);
    setComments("Sorting paused.");
  };

  // Resume the sorting process
  const resumeSorting = () => {
    sortingPaused.current = false;
    setIsPaused(false);
    setComments("Sorting resumed.");
  };

  // Show additional controls for custom input
  const showCustomControls = () => {
    setShowControls(true); // Hide default buttons and show custom controls
    setComments("Custom controls are now visible. You can input an array, pause, resume, or adjust speed.");
  };

  // Back to Default Buttons
  const backToDefaultView = () => {
    setShowControls(false); // Return to default buttons
    setComments("Back to default view. You can generate a random array or start Bubble Sort.");
  };

  return (
    <div className="bubble-sort-visualization">
      {/* Show tutorial on page load */}
      {showTutorial && <BubbleSortTutorial onClose={() => setShowTutorial(false)} />}

      <h1 className="title">Bubble Sort Visualization</h1>

      {/* Graph Section */}
      <div className="bars-container">
        {array.map((value, index) => (
          <div key={index} className="bar-wrapper">
            <div
              className="bar"
              style={{ height: `${value * 5}px` }}
              title={`Index: ${index}`}
            >
              {value}
            </div>
            <div className="bar-index">{index}</div>
          </div>
        ))}
      </div>

      <div className="comments">
        <p>{comments}</p>
      </div>

      {/* Metrics */}
      <div className="metrics">
        <p>Execution Time: {executionTime ? `${executionTime} ms` : "N/A"}</p>
        <p>Memory Usage: {memoryUsage ? `${memoryUsage} KB` : "N/A"}</p>
        <p>UI Response Time: {responseTime ? `${responseTime} ms` : "N/A"}</p>
      </div>

      {/* Default Buttons */}
      {!showControls && (
        <div className="default-buttons">
          <button onClick={generateRandomArray} disabled={isSorting} className="action-button">
            Generate Random Array
          </button>
          <button onClick={bubbleSort} disabled={isSorting} className="start-button">
            Start Bubble Sort
          </button>
          <button onClick={showCustomControls} disabled={isSorting} className="action-button">
            Custom User Controls
          </button>
        </div>
      )}

      {/* Show Custom Controls */}
      {showControls && (
        <>
          <div className="input-section">
            <input
              type="text"
              placeholder="Enter numbers separated by commas"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              disabled={isSorting}
              className="custom-input"
            />
            <button onClick={handleCustomInput} disabled={isSorting} className="action-button">
              Set Custom Array
            </button>
          </div>

          <div className="controls">
            <button onClick={bubbleSort} disabled={isSorting} className="start-button">
              Start Bubble Sort
            </button>
            <button onClick={pauseSorting} disabled={!isSorting || sortingPaused.current} className="pause-button">
              Pause
            </button>
            <button onClick={resumeSorting} disabled={!isSorting || !sortingPaused.current} className="resume-button">
              Resume
            </button>
          </div>

          <div className="speed-control">
            <label htmlFor="speed-slider">Adjust Speed:</label>
            <input
              id="speed-slider"
              type="range"
              min="100"
              max="1000"
              step="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
            <span>{speed}ms</span>
          </div>

          <div className="back-button">
            <button onClick={backToDefaultView} className="action-button">
              Back to Default View
            </button>
          </div>
        </>
      )}

      {/* Metrics */}
      <div className="metrics">
        <p>Execution Time: {executionTime ? `${executionTime} ms` : "N/A"}</p>
        <p>Memory Usage: {memoryUsage ? `${memoryUsage} KB` : "N/A"}</p>
        <p>UI Response Time: {responseTime ? `${responseTime} ms` : "N/A"}</p>
      </div>
    </div>
  );
};

export default BubbleSortVisualization;
