import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./StackVisualization.css";
import StackTutorials from "./StackTutorials"; // Import the Stack Tutorials component

const StackVisualization = () => {
  const [stack, setStack] = useState([]); // Stores stack elements
  const [value, setValue] = useState(""); // Value to push
  const [processSteps, setProcessSteps] = useState([]); // Tracks live comments
  const [showTutorial, setShowTutorial] = useState(false); // Tracks tutorial visibility

  useEffect(() => {
    drawStack();
  }, [stack]);

  // Push operation
  const pushElement = () => {
    if (!value) {
      alert("Please enter a value!");
      return;
    }
    const newStack = [...stack, value];
    setStack(newStack);
    setValue(""); // Clear the input
    setProcessSteps((prev) => [...prev, `Pushed value "${value}" onto the stack.`]);
  };

  // Pop operation
  const popElement = () => {
    if (stack.length === 0) {
      alert("Stack underflow! No elements to pop.");
      return;
    }
    const topValue = stack[stack.length - 1];
    const newStack = stack.slice(0, stack.length - 1);
    setStack(newStack);
    setProcessSteps((prev) => [...prev, `Popped value "${topValue}" from the stack.`]);
  };

  // Peek operation
  const peekElement = () => {
    if (stack.length === 0) {
      alert("Stack is empty!");
      return;
    }
    const topValue = stack[stack.length - 1];
    setProcessSteps((prev) => [...prev, `Peeked at the top value: "${topValue}".`]);
  };

  // Check if stack is empty
  const isStackEmpty = () => {
    const message = stack.length === 0 ? "The stack is empty." : "The stack is not empty.";
    setProcessSteps((prev) => [...prev, message]);
  };

  // Get size of the stack
  const stackSize = () => {
    const size = stack.length;
    setProcessSteps((prev) => [...prev, `The stack size is: ${size}.`]);
  };

  // Draw Stack
  const drawStack = () => {
    const width = 400;
    const height = stack.length * 50 + 50;

    const svg = d3
      .select("#stack-container")
      .selectAll("svg")
      .data([null])
      .join("svg")
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("g").remove(); // Clear previous elements

    const nodeGroup = svg
      .selectAll("g.node")
      .data(stack)
      .join("g")
      .attr("class", "node")
      .attr("transform", (d, i) => `translate(${width / 2 - 100}, ${height - (i + 1) * 50})`);

    // Draw rectangles (stack elements)
    nodeGroup
      .append("rect")
      .attr("width", 200)
      .attr("height", 40)
      .attr("fill", "#007bff")
      .attr("stroke", "#333")
      .attr("stroke-width", 2);

    // Draw values inside stack elements
    nodeGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", 100)
      .attr("y", 25)
      .attr("fill", "#fff")
      .attr("font-size", "16px")
      .text((d) => d);
  };

  return (
    <div className="StackVisualization">
      <h1>Stack Visualization</h1>
      <button onClick={() => setShowTutorial(true)}>Show Stack Tutorials</button>
      {showTutorial && <StackTutorials onClose={() => setShowTutorial(false)} />}
      <div id="stack-container"></div>
      <div className="controls">
        <input
          type="text"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={pushElement}>Push</button>
        <button onClick={popElement}>Pop</button>
        <button onClick={peekElement}>Peek</button>
        <button onClick={isStackEmpty}>Is Empty</button>
        <button onClick={stackSize}>Size</button>
      </div>
      <div className="process-steps-container">
        <h2>Process Steps:</h2>
        <ul>
          {processSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StackVisualization;
