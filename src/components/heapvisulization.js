import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./heapvisulization.css";

const HeapSortVisualization = () => {
  const [array, setArray] = useState([]);
  const [originalArray, setOriginalArray] = useState([]); // Store the original array
  const [steps, setSteps] = useState([]);
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const [heapSize, setHeapSize] = useState(0);
  const [sorting, setSorting] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const treeRef = React.useRef();
  const [showSortedTree, setShowSortedTree] = useState(false);
  const [customInput, setCustomInput] = useState(""); // Handle custom input

  useEffect(() => {
    generateRandomArray();
  }, []);

  useEffect(() => {
    if (showSortedTree) {
      renderTree(array, "Sorted Tree");
    } else {
      renderTree(array.slice(0, heapSize), "Heap Tree");
    }
  }, [array, highlightedNodes, showSortedTree]);

  // Function to generate a random array
  const generateRandomArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
    setOriginalArray([...newArray]);
    setSteps([]);
    setHighlightedNodes([]);
    setSorting(false);
    setHeapSize(newArray.length);
    setShowSortedTree(false);
  };

  // Function to handle custom input
  const handleCustomInput = () => {
    const inputArray = customInput
      .split(",")
      .map((num) => parseInt(num.trim()))
      .filter((num) => !isNaN(num)); // Parse and validate the input

    if (inputArray.length === 0) {
      alert("Invalid input. Please enter numbers separated by commas.");
      return;
    }

    setArray(inputArray);
    setOriginalArray([...inputArray]); // Save the original custom input
    setSteps([]);
    setHighlightedNodes([]);
    setSorting(false);
    setHeapSize(inputArray.length);
    setShowSortedTree(false);
  };

  // Delay function for animations
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Function to heapify a subtree rooted at index `i`
  const heapify = async (arr, n, i) => {
    let largest = i; // Initialize the largest as root
    const left = 2 * i + 1; // Left child index
    const right = 2 * i + 2; // Right child index
  
    // Highlight nodes being compared in yellow
    setHighlightedNodes([i, left, right]);
    await delay(speed);
  
    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }
  
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }
  
    // Highlight nodes being swapped in red
    if (largest !== i) {
      setHighlightedNodes([i, largest]);
      await delay(speed);
  
      [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap elements
      setArray([...arr]); // Update the visualization
      setSteps((prevSteps) => [
        ...prevSteps,
        `Swapped ${arr[i]} with ${arr[largest]} to maintain heap property.`,
      ]);
      await delay(speed);
  
      // Recursively heapify the affected subtree
      await heapify(arr, n, largest);
    }
  };
  

  // Function to build a max-heap
  const buildMaxHeap = async (arr) => {
    const n = arr.length;

    // Start heapifying from the last non-leaf node
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    setSteps((prevSteps) => [...prevSteps, "Max-heap built."]);
  };

  // Function to perform heap sort
  const heapSort = async () => {
    setSorting(true);
    const arr = [...array];
    const n = arr.length;

    setSteps((prevSteps) => [...prevSteps, "Starting heap sort..."]);

    // Build the initial max-heap
    await buildMaxHeap(arr);

    // Extract elements from the heap one by one
    for (let i = n - 1; i > 0; i--) {
      // Swap the root (largest) with the last element
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]); // Update the visualization
      setSteps((prevSteps) => [
        ...prevSteps,
        `Moved largest element ${arr[i]} to its correct position.`,
      ]);
      await delay(speed);

      // Reduce the heap size and heapify the root
      setHeapSize(i); // Reduce the active heap size
      await heapify(arr, i, 0);
    }

    setSteps((prevSteps) => [...prevSteps, "Heap sort completed!"]);
    setSorting(false);
    setHighlightedNodes([]);
    setShowSortedTree(true); // Show the sorted tree
  };

  // Function to render the heap as a tree structure
  const renderTree = (dataArray, title) => {
    if (dataArray.length === 0) {
      console.error("Tree data is empty");
      return;
    }
  
    // Build the tree data structure
    const data = dataArray.map((value, index) => ({
      name: value.toString(),
      index, // Keep track of the node index for comparison
      children: [],
    }));
  
    for (let i = 0; i < dataArray.length; i++) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < dataArray.length) data[i].children.push(data[left]);
      if (right < dataArray.length) data[i].children.push(data[right]);
    }
  
    const width = 800;
    const height = 400;
  
    // Clear previous tree
    d3.select(treeRef.current).selectAll("*").remove();
    const svg = d3
      .select(treeRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  
    const root = d3.hierarchy(data[0]);
    const treeLayout = d3.tree().size([width - 100, height - 100]);
    const tree = treeLayout(root);
  
    const g = svg.append("g").attr("transform", "translate(50,75)");
  
    // Draw links
    g.selectAll(".link")
      .data(tree.links())
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y)
      .style("stroke", "#ccc")
      .style("stroke-width", 2);
  
    // Draw nodes
    g.selectAll(".node")
      .data(tree.descendants())
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 20)
      .style("fill", (d) => {
        if (highlightedNodes.includes(d.data.index)) {
          return highlightedNodes.length === 2 ? "red" : "yellow"; // Red for swaps, yellow for comparisons
        }
        return "#6c757d"; // Default node color
      })
      .style("stroke", "#333")
      .style("stroke-width", 2);
  
    // Draw labels
    g.selectAll(".label")
      .data(tree.descendants())
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y - 25)
      .style("text-anchor", "middle")
      .style("font-size", "20px")
      .text((d) => d.data.name);
  
    // Add title to the tree
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 12)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text(title);
  };
  
  return (
    <div className="heap-sort-page">
      <h1>Heap Sort Visualization</h1>
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
        <button onClick={generateRandomArray} disabled={sorting}>
          Generate Random Array
        </button>
        <button onClick={heapSort} disabled={sorting}>
          Start Sorting
        </button>
        <label>
          Speed:
          <input
            type="range"
            min="200"
            max="2000"
            step="100"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={sorting}
          />
        </label>
      </div>
      <div ref={treeRef} className="tree-container"></div>

      {/* Display Original and Sorted Arrays */}
      <div className="array-display">
        <h2>Original Array:</h2>
        <p>{originalArray.join(", ")}</p>
        {showSortedTree && (
          <>
            <h2>Sorted Array:</h2>
            <p>{array.join(", ")}</p>
          </>
        )}
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

export default HeapSortVisualization;
