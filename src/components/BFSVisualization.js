import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./BFSVisualization.css";

const BFSVisualization = () => {
  const [graph, setGraph] = useState({ nodes: [], edges: [] });
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [steps, setSteps] = useState([]);
  const [customNodeInput, setCustomNodeInput] = useState("");
  const [customEdgeInput, setCustomEdgeInput] = useState("");
  const [rootNode, setRootNode] = useState(null);
  const [goalNode, setGoalNode] = useState(null);

  useEffect(() => {
    drawGraph();
  }, [graph, visitedNodes]);

  const bfsTraversal = async (source, goal) => {
    const queue = [];
    const visited = new Set();
    const traversalSteps = [];

    queue.push(source);
    visited.add(source);
    traversalSteps.push(`Enqueued starting node ${source}.`);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    while (queue.length > 0) {
      const current = queue.shift();
      traversalSteps.push(`Dequeued node ${current}.`);
      setVisitedNodes((prev) => [...prev, current]);
      await delay(1000);

      if (current === goal) {
        traversalSteps.push(`Goal node ${goal} found!`);
        setSteps([...traversalSteps]);
        return;
      }

      const neighbors = graph.edges
        .filter((edge) => edge.source === current || edge.target === current)
        .map((edge) => (edge.source === current ? edge.target : edge.source))
        .filter((neighbor) => !visited.has(neighbor));

      neighbors.forEach((neighbor) => {
        visited.add(neighbor);
        queue.push(neighbor);
        traversalSteps.push(`Visited and enqueued node ${neighbor}.`);
      });

      setSteps([...traversalSteps]);
    }

    traversalSteps.push("Traversal complete! Goal node not found.");
    setSteps([...traversalSteps]);
  };

  const generateRandomConnectedGraph = () => {
    const numNodes = 6;
    const nodeSpacing = 100;
    const newNodes = Array.from({ length: numNodes }, (_, i) => ({
      id: i + 1,
      x: Math.random() * (500 - nodeSpacing) + nodeSpacing,
      y: Math.random() * (300 - nodeSpacing) + nodeSpacing,
    }));

    const newEdges = [];
    for (let i = 0; i < numNodes - 1; i++) {
      newEdges.push({ source: newNodes[i].id, target: newNodes[i + 1].id });
    }

    for (let i = 0; i < numNodes; i++) {
      const randomTarget = Math.floor(Math.random() * numNodes) + 1;
      if (
        randomTarget !== newNodes[i].id &&
        !newEdges.some(
          (edge) =>
            (edge.source === newNodes[i].id && edge.target === randomTarget) ||
            (edge.source === randomTarget && edge.target === newNodes[i].id)
        )
      ) {
        newEdges.push({ source: newNodes[i].id, target: randomTarget });
      }
    }

    setGraph({ nodes: newNodes, edges: newEdges });
    setVisitedNodes([]);
    setSteps([]);
    setRootNode(null);
    setGoalNode(null);
  };

  const drawGraph = () => {
    const width = 600;
    const height = 400;

    const svg = d3
      .select("#graph-container")
      .selectAll("svg")
      .data([null])
      .join("svg")
      .attr("width", width)
      .attr("height", height);
 
    svg
      .selectAll("line")
      .data(graph.edges)
      .join("line")
      .attr("x1", (d) => graph.nodes.find((node) => node.id === d.source).x)
      .attr("y1", (d) => graph.nodes.find((node) => node.id === d.source).y)
      .attr("x2", (d) => graph.nodes.find((node) => node.id === d.target).x)
      .attr("y2", (d) => graph.nodes.find((node) => node.id === d.target).y)
      .attr("stroke", "#ccc")
      .attr("stroke-width", 2);

    svg
      .selectAll("circle")
      .data(graph.nodes)
      .join("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 20)
      .attr("fill", (d) =>
        visitedNodes.includes(d.id)
          ? "orange"
          : d.id === rootNode
          ? "green"
          : d.id === goalNode
          ? "red"
          : "#007bff"
      )
      .attr("stroke", "#333")
      .attr("stroke-width", 2);

    svg
      .selectAll("text")
      .data(graph.nodes)
      .join("text")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y + 5)
      .attr("text-anchor", "middle")
      .attr("fill", "#fff")
      .attr("font-size", "14px")
      .text((d) => d.id);
    
  };

  const handleCustomNodes = () => {
    const nodeIds = customNodeInput
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id !== "");
    const newNodes = nodeIds.map((id, index) => ({
      id: parseInt(id),
      x: Math.random() * 500 + 50,
      y: Math.random() * 300 + 50,
    }));

    setGraph((prevGraph) => ({
      nodes: newNodes,
      edges: prevGraph.edges,
    }));
    setVisitedNodes([]);
    setSteps([]);
  };

  const handleCustomEdges = () => {
    const edgeConnections = customEdgeInput
      .split(";")
      .map((edge) => edge.split("-").map((id) => parseInt(id.trim())));
    const newEdges = edgeConnections.map(([source, target]) => ({ source, target }));

    setGraph((prevGraph) => ({
      nodes: prevGraph.nodes,
      edges: newEdges,
    }));
    setVisitedNodes([]);
    setSteps([]);
  };

  const startBFS = () => {
    if (rootNode && graph.nodes.length > 0) {
      bfsTraversal(rootNode, goalNode);
    } else {
      alert("Please select valid root and goal nodes.");
    }
  };

  return (
    <div className="BFSVisualization">
      <h1>Breadth-First Search (BFS) Visualization</h1>
      <div id="graph-container"></div>
      <div className="controls">
        <button onClick={generateRandomConnectedGraph} className="control-button">
          Generate Random Graph
        </button>
        <div>
          <h3>Custom Nodes (comma-separated, e.g., 1,2,3):</h3>
          <input
            type="text"
            value={customNodeInput}
            onChange={(e) => setCustomNodeInput(e.target.value)}
          />
          <button onClick={handleCustomNodes} className="control-button">
            Set Nodes
          </button>
        </div>
        <div>
          <h3>Custom Edges (e.g., 1-2;2-3):</h3>
          <input
            type="text"
            value={customEdgeInput}
            onChange={(e) => setCustomEdgeInput(e.target.value)}
          />
          <button onClick={handleCustomEdges} className="control-button">
            Set Edges
          </button>
        </div>
        <div>
          <h3>Root Node:</h3>
          <input
            type="number"
            value={rootNode || ""}
            onChange={(e) => setRootNode(parseInt(e.target.value))}
          />
        </div>
        <div>
          <h3>Goal Node:</h3>
          <input
            type="number"
            value={goalNode || ""}
            onChange={(e) => setGoalNode(parseInt(e.target.value))}
          />
        </div>
        <button onClick={startBFS} className="control-button">
          Start BFS
        </button>
      </div>
      <div className="steps-container">
        <h2>Traversal Steps:</h2>
        <ul>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
        </div>
  );
};

export default BFSVisualization;
