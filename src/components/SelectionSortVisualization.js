import React, { useState, useEffect } from "react";
import "./SelectionSortVisualization.css";
import Editor from "@monaco-editor/react"; // Import Monaco Editor
import SelectionSortTutorials from "./SelectionSortTutorials";

const initialCode = `
const selectionSort = (array) => {
  let steps = []; // Track steps
  let comparisons = 0; // Track number of comparisons
  let swaps = 0; // Track number of swaps

  for (let i = 0; i < array.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      comparisons++;
      steps.push(\`Comparing element at index \${i} (\${array[i]}) with index \${j} (\${array[j]}).\`);
      if (array[j] < array[minIndex]) {
        minIndex = j;
        steps.push(\`Updating minimum index to \${minIndex} (\${array[minIndex]}).\`);
      }
    }

    if (minIndex !== i) {
      swaps++;
      steps.push(\`Swapping elements at index \${i} (\${array[i]}) and \${minIndex} (\${array[minIndex]}).\`);
      [array[i], array[minIndex]] = [array[minIndex], array[i]]; // Swap elements
    }
  }

  return { 
    sortedArray: array, 
    steps: steps, 
    comparisons: comparisons, 
    swaps: swaps 
  };
};
`;

const SelectionSortVisualization = () => {
  const [array, setArray] = useState([]);
  const [customInput, setCustomInput] = useState(""); // Handle custom input
  const [code, setCode] = useState(initialCode); // Code in Monaco Editor
  const [executionResult, setExecutionResult] = useState(null); // Sorting result
  const [steps, setSteps] = useState([]); // Sorting process steps
  const [executionTime, setExecutionTime] = useState(null); // Time taken for execution
  const [memoryUsage, setMemoryUsage] = useState(null); // Memory usage
  const [currentIndex, setCurrentIndex] = useState(null); // Current index being sorted
  const [highlighted, setHighlighted] = useState(null); // Indices being compared
  const [sortedIndices, setSortedIndices] = useState([]); // Sorted indices
  const [sorting, setSorting] = useState(false); // Lock during sorting
  const [isEditorVisible, setIsEditorVisible] = useState(false); // Toggle editor visibility
  const [showTutorial, setShowTutorial] = useState(true); // Control tutorial visibility

  const handleCloseTutorial = () => {
    setShowTutorial(false); // Hide the tutorial when the Close button is clicked
  };

  useEffect(() => {
    generateArray(); // Generate default random array on page load
  }, []);

  // Generate a random array
  const generateArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
    setExecutionResult(null); // Reset previous result
    setSteps([]); // Reset steps
    setSortedIndices([]); // Reset sorted indices
    setHighlighted(null); // Reset highlighted indices
    setExecutionTime(null); // Reset execution time
    setMemoryUsage(null); // Reset memory usage
  };

  // Handle custom array input
  const handleCustomInput = () => {
    const inputArray = customInput.split(",").map((num) => parseInt(num.trim()));
    if (inputArray.some(isNaN)) {
      alert("Invalid input. Please enter numbers separated by commas.");
      return;
    }
    setArray(inputArray);
    setExecutionResult(null); // Reset previous result
    setSteps([]); // Reset steps
    setSortedIndices([]); // Reset sorted indices
    setHighlighted(null); // Reset highlighted indices
    setExecutionTime(null); // Reset execution time
    setMemoryUsage(null); // Reset memory usage
  };

  // Run the code in the Monaco Editor
  const runCode = () => {
    try {
      const userFunction = new Function("array", code); // Dynamically create the function
      const startTime = performance.now(); // Start execution timer
      const result = userFunction([...array]); // Execute the function with a copy of the array
      const endTime = performance.now(); // End execution timer

      // Calculate memory usage
      const memoryUsageBytes = JSON.stringify(array).length;

      // Validate the returned result format
      if (
        result &&
        Array.isArray(result.sortedArray) &&
        Array.isArray(result.steps) &&
        typeof result.comparisons === "number" &&
        typeof result.swaps === "number"
      ) {
        setExecutionResult({
          ...result,
          timeTaken: endTime - startTime, // Execution time
          spaceComplexity: `${memoryUsageBytes} bytes`, // Approximate space complexity
        });
        setExecutionTime((endTime - startTime).toFixed(2)); // Set execution time
        setMemoryUsage(`${memoryUsageBytes} bytes`); // Set memory usage
        setSteps(result.steps); // Update sorting steps for visualization
        setSortedIndices(result.sortedArray.map(() => true)); // Mark all indices as sorted
      } else {
        throw new Error(
          "Invalid result format. Ensure your function returns an object with 'sortedArray', 'steps', 'comparisons', and 'swaps'."
        );
      }
    } catch (error) {
      alert("Error in code execution: " + error.message);
    }
  };

  const selectionSort = async () => {
    setSorting(true);
    const arrayCopy = [...array];
    const startTime = performance.now(); // Start tracking execution time
    let stepDetails = [];

    for (let i = 0; i < arrayCopy.length; i++) {
      let minIndex = i;
      setCurrentIndex(i); // Show the current index being sorted

      for (let j = i + 1; j < arrayCopy.length; j++) {
        setHighlighted([i, j]); // Highlight elements being compared
        stepDetails.push(`Comparing element at index ${i} (${arrayCopy[i]}) with index ${j} (${arrayCopy[j]}).`);
        setSteps([...stepDetails]); // Update steps live

        await new Promise((resolve) => setTimeout(resolve, 800)); // Delay for visualization

        if (arrayCopy[j] < arrayCopy[minIndex]) {
          minIndex = j;
          stepDetails.push(`Updating minimum index to ${minIndex} (${arrayCopy[minIndex]}).`);
          setSteps([...stepDetails]); // Update steps live
        }
      }

      if (minIndex !== i) {
        stepDetails.push(`Swapping elements at index ${i} (${arrayCopy[i]}) and ${minIndex} (${arrayCopy[minIndex]}).`);
        setSteps([...stepDetails]); // Update steps live

        // Swapping animation
        const box1 = document.getElementById(`index-${i}`);
        const box2 = document.getElementById(`index-${minIndex}`);

        if (box1 && box2) {
          const tempTransform = box1.style.transform;
          box1.style.transform = box2.style.transform;
          box2.style.transform = tempTransform;

          await new Promise((resolve) => setTimeout(resolve, 800));
        }

        // Swap values in the array
        [arrayCopy[i], arrayCopy[minIndex]] = [arrayCopy[minIndex], arrayCopy[i]];
        setArray([...arrayCopy]); // Update the array
      }

      setSortedIndices((prev) => [...prev, i]); // Mark the index as sorted
    }

    setExecutionTime(performance.now() - startTime); // Record execution time
    setSorting(false);
    setCurrentIndex(null);
    setHighlighted(null);
  };

  const toggleEditorVisibility = () => {
    setIsEditorVisible(!isEditorVisible); // Toggle visibility of the editor
  };

  const renderArray = () => {
    return (
      <div className="array-box">
        {array.map((value, index) => (
          <div
            key={index}
            id={`index-${index}`}
            className={`index-box ${
              highlighted && highlighted.includes(index) ? "highlighted" : ""
            } ${sortedIndices.includes(index) ? "sorted" : ""}`}
          >
            <div className="value">{value}</div>
            <div className="index">{index}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="selection-sort-page">
      {showTutorial && <SelectionSortTutorials onClose={handleCloseTutorial} />} {/* Tutorials */}
      <h1>Selection Sort Visualization</h1>
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
          Generate Random Array
        </button>
              <button onClick={runCode} disabled={sorting}>
          Run Code
        </button>
        <button onClick={selectionSort} disabled={sorting}>
          Start Selection Sort
        </button>
        <button onClick={toggleEditorVisibility}>
          {isEditorVisible ? "Hide Editor" : "Show Editor"}
        </button>
      </div>
      {isEditorVisible && (
        <div className="editor">
          <h2>Editable Code</h2>
          <Editor
            height="300px"
            defaultLanguage="javascript"
            value={code}
            onChange={(value) => setCode(value)}
          />
        </div>
      )}
      {renderArray()}
      <div className="steps">
        <h2>Steps:</h2>
        <ol>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
      {executionResult && (
        <div className="execution-result">
          <h2>Execution Result</h2>
          <p>
            Sorted Array: {executionResult.sortedArray.join(", ")}
          </p>
          <p>Total Steps: {executionResult.steps.length}</p>
          <p>Comparisons: {executionResult.comparisons}</p>
          <p>Swaps: {executionResult.swaps}</p>
          <p>Execution Time: {executionTime} ms</p>
          <p>Space Complexity: {executionResult.spaceComplexity}</p>
          <p>Memory Usage: {memoryUsage}</p>
        </div>
      )}
    </div>
  );
};

export default SelectionSortVisualization;
