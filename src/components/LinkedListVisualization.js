import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./LinkedListVisualization.css";
import LinkedListTutorials from "./LinkedListTutorials"; // Import tutorials component

const LinkedListVisualization = () => {
  const [linkedList, setLinkedList] = useState([]);
  const [value, setValue] = useState("");
  const [position, setPosition] = useState(null);
  const [head, setHead] = useState(null);
  const [processSteps, setProcessSteps] = useState([]); // Tracks live comments
  const [showTutorial, setShowTutorial] = useState(false); // Tracks tutorial visibility

  useEffect(() => {
    drawLinkedList();
  }, [linkedList]);

  // Node structure
  const createNode = (value, next = null) => {
    return { value, next };
  };

  // Insert at beginning
  const insertAtBeginning = () => {
    const newNode = createNode(value, head);
    setHead(newNode);
    setLinkedList((prev) => [newNode, ...prev]);
    setValue(""); // Clear input
    setProcessSteps((prev) => [
      ...prev,
      `Node with value "${value}" inserted at the beginning.`,
    ]);
  };

  // Insert at end
  const insertAtEnd = () => {
    if (!head) {
      insertAtBeginning();
      return;
    }
    const newNode = createNode(value);
    const newList = [...linkedList];
    let current = newList[0];
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
    newList.push(newNode);
    setLinkedList(newList);
    setValue(""); // Clear input
    setProcessSteps((prev) => [
      ...prev,
      `Node with value "${value}" inserted at the end.`,
    ]);
  };

  // Insert at specific position
  const insertAtPosition = () => {
    const pos = parseInt(position);
    if (pos < 0 || pos > linkedList.length) {
      alert("Invalid position!");
      return;
    }
    if (pos === 0) {
      insertAtBeginning();
      return;
    }
    const newNode = createNode(value);
    const newList = [...linkedList];
    let current = newList[0];
    setProcessSteps((prev) => [...prev, `Traversal started.`]);
    for (let i = 0; i < pos - 1; i++) {
      setProcessSteps((prev) => [
        ...prev,
        `Moved to node with value "${current.value}".`,
      ]);
      current = current.next;
    }
    newNode.next = current.next;
    current.next = newNode;
    newList.splice(pos, 0, newNode);
    setLinkedList(newList);
    setValue("");
    setPosition(null);
    setProcessSteps((prev) => [
      ...prev,
      `Node with value "${value}" inserted at position ${pos}.`,
    ]);
  };

  // Delete at beginning
  const deleteAtBeginning = () => {
    if (!head) {
      alert("List is empty!");
      return;
    }
    setProcessSteps((prev) => [
      ...prev,
      `Node with value "${linkedList[0].value}" deleted from the beginning.`,
    ]);
    setHead(head.next);
    setLinkedList((prev) => prev.slice(1));
  };

  // Delete at end
  const deleteAtEnd = () => {
    if (!head) {
      alert("List is empty!");
      return;
    }
    const newList = [...linkedList];
    if (newList.length === 1) {
      deleteAtBeginning();
      return;
    }
    let current = newList[0];
    while (current.next && current.next.next) {
      current = current.next;
    }
    const deletedValue = current.next.value;
    current.next = null;
    newList.pop();
    setLinkedList(newList);
    setProcessSteps((prev) => [
      ...prev,
      `Node with value "${deletedValue}" deleted from the end.`,
    ]);
  };

  // Delete at specific position
  const deleteAtPosition = () => {
    const pos = parseInt(position);
    if (pos < 0 || pos >= linkedList.length) {
      alert("Invalid position!");
      return;
    }
    if (pos === 0) {
      deleteAtBeginning();
      return;
    }
    const newList = [...linkedList];
    let current = newList[0];
    setProcessSteps((prev) => [...prev, `Traversal started.`]);
    for (let i = 0; i < pos - 1; i++) {
      setProcessSteps((prev) => [
        ...prev,
        `Moved to node with value "${current.value}".`,
      ]);
      current = current.next;
    }
    const deletedValue = current.next.value;
    current.next = current.next.next;
    newList.splice(pos, 1);
    setLinkedList(newList);
    setPosition(null);
    setProcessSteps((prev) => [
      ...prev,
      `Node with value "${deletedValue}" deleted from position ${pos}.`,
    ]);
  };

  // Draw Linked List
  const drawLinkedList = () => {
    const width = 800;
    const height = 200;

    const svg = d3
      .select("#linked-list-container")
      .selectAll("svg")
      .data([null])
      .join("svg")
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("g").remove(); // Clear previous elements

    // Node group
    const nodeGroup = svg
      .selectAll("g.node")
      .data(linkedList)
      .join("g")
      .attr("class", "node")
      .attr("transform", (d, i) => `translate(${i * 120 + 50}, ${height / 2})`);

    // Draw nodes
    nodeGroup
      .append("circle")
      .attr("r", 30)
      .attr("fill", "#007bff")
      .attr("stroke", "#333")
      .attr("stroke-width", 2);

    // Draw node values
    nodeGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("fill", "#fff")
      .attr("font-size", "16px")
      .text((d) => d.value);

    // Draw connections (edges)
    svg
      .selectAll("line")
      .data(linkedList.slice(0, linkedList.length - 1))
      .join("line")
      .attr("x1", (d, i) => i * 120 + 80)
      .attr("y1", height / 2)
      .attr("x2", (d, i) => (i + 1) * 120 + 20)
      .attr("y2", height / 2)
      .attr("stroke", "#ccc")
      .attr("stroke-width", 2);
  };

  return (
    <div className="LinkedListVisualization">
      <h1>Linked List Page</h1>
      <button onClick={() => setShowTutorial(true)}>Show Linked List Tutorials</button>
      {showTutorial && <LinkedListTutorials onClose={() => setShowTutorial(false)} />}
      <div id="linked-list-container"></div>
      <div className="controls">
        <input
          type="text"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <input
          type="number"
          placeholder="Position"
          value={position || ""}
          onChange={(e) => setPosition(e.target.value)}
        />
        <button onClick={insertAtBeginning}>Insert at Beginning</button>
        <button onClick={insertAtEnd}>Insert at End</button>
        <button onClick={insertAtPosition}>Insert at Position</button>
        <button onClick={deleteAtBeginning}>Delete at Beginning</button>
        <button onClick={deleteAtEnd}>Delete at End</button>
        <button onClick={deleteAtPosition}>Delete at Position</button>
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

export default LinkedListVisualization;
