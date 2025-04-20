import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./QueueVisualization.css";
import QueueTutorials from "./QueueTutorials"; // Import tutorials component

const QueueVisualization = () => {
  const [queue, setQueue] = useState([]); // Stores queue elements
  const [value, setValue] = useState(""); // Value to enqueue
  const [processSteps, setProcessSteps] = useState([]); // Tracks live comments
  const [showTutorial, setShowTutorial] = useState(false); // Tracks tutorial visibility

  useEffect(() => {
    drawQueue();
  }, [queue]);

  // Enqueue operation
  const enqueueElement = () => {
    if (!value) {
      alert("Please enter a value!");
      return;
    }
    const newQueue = [...queue, value];
    setQueue(newQueue);
    setValue(""); // Clear the input
    setProcessSteps((prev) => [...prev, `Enqueued value "${value}" into the queue.`]);
  };

  // Dequeue operation
  const dequeueElement = () => {
    if (queue.length === 0) {
      alert("Queue underflow! No elements to dequeue.");
      return;
    }
    const frontValue = queue[0];
    const newQueue = queue.slice(1);
    setQueue(newQueue);
    setProcessSteps((prev) => [...prev, `Dequeued value "${frontValue}" from the queue.`]);
  };

  // Peek operation
  const peekElement = () => {
    if (queue.length === 0) {
      alert("Queue is empty!");
      return;
    }
    const frontValue = queue[0];
    setProcessSteps((prev) => [...prev, `Peeked at the front value: "${frontValue}".`]);
  };

  // Check if queue is empty
  const isQueueEmpty = () => {
    const message = queue.length === 0 ? "The queue is empty." : "The queue is not empty.";
    setProcessSteps((prev) => [...prev, message]);
  };

  // Get size of the queue
  const queueSize = () => {
    const size = queue.length;
    setProcessSteps((prev) => [...prev, `The queue size is: ${size}.`]);
  };

  // Draw Queue
  const drawQueue = () => {
    const width = 600;
    const height = 100;

    const svg = d3
      .select("#queue-container")
      .selectAll("svg")
      .data([null])
      .join("svg")
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("g").remove(); // Clear previous elements

    const nodeGroup = svg
      .selectAll("g.node")
      .data(queue)
      .join("g")
      .attr("class", "node")
      .attr("transform", (d, i) => `translate(${i * 100 + 20}, ${height / 2 - 20})`);

    // Draw rectangles (queue elements)
    nodeGroup
      .append("rect")
      .attr("width", 80)
      .attr("height", 40)
      .attr("fill", "#007bff")
      .attr("stroke", "#333")
      .attr("stroke-width", 2);

    // Draw values inside queue elements
    nodeGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", 40)
      .attr("y", 25)
      .attr("fill", "#fff")
      .attr("font-size", "16px")
      .text((d) => d);
  };

  return (
    <div className="QueueVisualization">
      <h1></h1>
      <button onClick={() => setShowTutorial(true)}>Show Queue Tutorials</button>
      {showTutorial && <QueueTutorials onClose={() => setShowTutorial(false)} />}
      <div id="queue-container"></div>
      <div className="controls">
        <input
          type="text"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={enqueueElement}>Enqueue</button>
        <button onClick={dequeueElement}>Dequeue</button>
        <button onClick={peekElement}>Peek</button>
        <button onClick={isQueueEmpty}>Is Empty</button>
        <button onClick={queueSize}>Size</button>
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

export default QueueVisualization;
