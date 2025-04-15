import React, { useState, useEffect } from "react";
import "./InsertionSortVisualization.css";

const InsertionSortVisualization = () => {
  const [array, setArray] = useState([]);
  const [customInput, setCustomInput] = useState(""); // Handle custom input
  const [steps, setSteps] = useState([]); // Track sorting steps
  const [sorting, setSorting] = useState(false); // Lock during sorting
  const [currentValue, setCurrentValue] = useState(null); // Current number being sorted
  const [comparingIndex, setComparingIndex] = useState(null); // Index being compared
  const [insertionIndex, setInsertionIndex] = useState(null); // Final placement index
  const [speed, setSpeed] = useState(1000); // Animation speed

  useEffect(() => {
    generateArray(); // Generate default random array on page load
  }, []);

  const generateArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
    setSteps([]);
    setSorting(false);
    setCurrentValue(null);
    setComparingIndex(null);
    setInsertionIndex(null);
  };

  const handleCustomInput = () => {
    const inputArray = customInput
      .split(",")
      .map((num) => parseInt(num.trim()))
      .filter((num) => !isNaN(num));

    if (inputArray.length === 0) {
      alert("Invalid input. Please enter numbers separated by commas.");
      return;
    }

    setArray(inputArray);
    setSteps([]);
    setSorting(false);
    setCurrentValue(null);
    setComparingIndex(null);
    setInsertionIndex(null);
  };

  const insertionSort = async () => {
    setSorting(true);
    const arrayCopy = [...array];
    const newSteps = [];

    for (let i = 1; i < arrayCopy.length; i++) {
      const current = arrayCopy[i];
      setCurrentValue(current); // Highlight the current number below the array
      setInsertionIndex(null); // Clear insertion index for this step
      newSteps.push(`Taking ${current} down to compare.`);
      setSteps([...newSteps]);
      arrayCopy[i] = null; // Temporarily remove the current value from the array
      setArray([...arrayCopy]);
      await delay(speed);

      let j = i - 1;
      while (j >= 0 && arrayCopy[j] > current) {
        setComparingIndex(j); // Highlight the comparison index
        newSteps.push(`Comparing ${current} with ${arrayCopy[j]}.`);
        setSteps([...newSteps]);
        await delay(speed);

        newSteps.push(`Shifting ${arrayCopy[j]} to index ${j + 1}.`);
        setSteps([...newSteps]);
        arrayCopy[j + 1] = arrayCopy[j]; // Shift larger number to the right
        setArray([...arrayCopy]);
        await delay(speed);

        j--;
      }

      setComparingIndex(null); // Clear comparison highlights
      setInsertionIndex(j + 1); // Mark the final insertion position
      arrayCopy[j + 1] = current; // Insert the current number
      newSteps.push(`Placing ${current} at index ${j + 1}.`);
      setSteps([...newSteps]);
      setArray([...arrayCopy]);
      await delay(speed);

      setCurrentValue(null); // Clear the current number highlight for next step
    }

    setSorting(false);
    setComparingIndex(null);
    setInsertionIndex(null);
    setCurrentValue(null);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const renderArray = () => {
    return (
      <div className="array-container">
        {array.map((value, index) => (
          <div
            key={index}
            className={`array-element ${
              comparingIndex === index ? "comparing" : ""
            } ${insertionIndex === index ? "insertion" : ""}`}
          >
            {value !== null ? <div className="value">{value}</div> : <div className="placeholder"></div>}
            <div className="index">Index: {index}</div>
          </div>
        ))}
        {currentValue !== null && (
          <div className="current-number-container">
            <div className="current-number">Current: {currentValue}</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="insertion-sort-page">
      <h1>Insertion Sort Visualization</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Enter numbers separated by commas"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          disabled={sorting}
        />
        <button onClick={handleCustomInput} disabled={sorting}>
          Set Custom Array
        </button>
        <button onClick={generateArray} disabled={sorting}>
          Generate Array
        </button>
        <button onClick={insertionSort} disabled={sorting}>
          Start Sorting
        </button>
        <div className="speed-control">
          <label htmlFor="speed">Speed:</label>
          <input
            type="range"
            id="speed"
            min="200"
            max="2000"
            step="100"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            disabled={sorting}
          />
        </div>
      </div>
      {renderArray()}
      <div className="legend">
        <h3>Legend:</h3>
        <p>
          <span className="color-box current"></span> Current number being sorted (red)
        </p>
        <p>
          <span className="color-box comparing"></span> Number being compared (yellow)
        </p>
        <p>
          <span className="color-box insertion"></span> Insertion position (green)
        </p>
      </div>
      <div className="steps">
        <h2>Steps:</h2>
        <ol>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default InsertionSortVisualization;
