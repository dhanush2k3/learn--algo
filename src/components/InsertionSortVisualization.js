import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./InsertionSortVisualization.css";

const InsertionSortVisualization = () => {
  const [array, setArray] = useState([]);
  const [customInput, setCustomInput] = useState("");
  const [steps, setSteps] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [speed, setSpeed] = useState(1000);

  useEffect(() => {
    generateArray();
  }, []);

  useEffect(() => {
    renderArrayD3();
  }, [array]);

  const generateArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
    setSteps([]);
    setSorting(false);
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
  };

  const insertionSort = async () => {
    setSorting(true);
    const arrayCopy = [...array];
    const newSteps = [];

    for (let i = 1; i < arrayCopy.length; i++) {
      const current = arrayCopy[i];
      newSteps.push(`Current number: ${current}`);
      setSteps([...newSteps]);
      highlightCurrentD3(i);
      await delay(speed);

      let j = i - 1;
      while (j >= 0 && arrayCopy[j] > current) {
        highlightComparisonD3(j, i);
        newSteps.push(`Comparing ${current} with ${arrayCopy[j]}`);
        setSteps([...newSteps]);
        await delay(speed);

        newSteps.push(`Swapping ${arrayCopy[j]} and ${current}`);
        setSteps([...newSteps]);
        renderSwapD3(j, j + 1);
        await delay(speed);

        arrayCopy[j + 1] = arrayCopy[j];
        j--;
      }

      arrayCopy[j + 1] = current;
      highlightInsertionD3(j + 1);
      newSteps.push(`Placed ${current} at index ${j + 1}`);
      setSteps([...newSteps]);
      setArray([...arrayCopy]);
      await delay(speed);
    }

    setSorting(false);
  };

  const highlightCurrentD3 = (index) => {
    const container = d3.select(".array-container");
    container
      .selectAll(".array-element")
      .attr("class", (d, i) => (i === index ? "array-element current" : "array-element"));
  };

  const highlightComparisonD3 = (compareIndex, currentIndex) => {
    const container = d3.select(".array-container");
    container
      .selectAll(".array-element")
      .attr("class", (d, i) => {
        if (i === currentIndex) return "array-element current";
        if (i === compareIndex) return "array-element comparing";
        return "array-element";
      });
  };

  const highlightInsertionD3 = (index) => {
    const container = d3.select(".array-container");
    container
      .selectAll(".array-element")
      .attr("class", (d, i) => (i === index ? "array-element insertion" : "array-element"));
  };

  const renderSwapD3 = (index1, index2) => {
    const container = d3.select(".array-container");
    const elements = container.selectAll(".array-element");
    const firstElement = elements.filter((_, i) => i === index1);
    const secondElement = elements.filter((_, i) => i === index2);

    const firstX = index1 * 50; // Calculate position based on index
    const secondX = index2 * 50; // Calculate position based on index

    firstElement.transition().duration(speed).style("transform", `translateX(${secondX}px)`);
    secondElement.transition().duration(speed).style("transform", `translateX(${firstX}px)`);
  };

  const renderArrayD3 = () => {
    const container = d3.select(".array-container");
    container.selectAll("*").remove();

    container
      .selectAll(".array-element")
      .data(array)
      .enter()
      .append("div")
      .attr("class", "array-element")
      .style("transform", (_, i) => `translateX(${i * 60}px)`) // Adjust for centering
      .html((d, i) => `<span>${d}</span><div class="index"> ${i}</div>`);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
      <div className="array-container"></div>
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
