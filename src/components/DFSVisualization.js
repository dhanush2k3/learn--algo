import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./DFSVisualization.css";

const DFSVisualization = () => {
  const [view, setView] = useState("default"); // Toggle between default and custom views
  const [treeData, setTreeData] = useState(null);
  const [graph, setGraph] = useState({ nodes: [], edges: [] });
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [backtrackedNodes, setBacktrackedNodes] = useState([]);
  const [steps, setSteps] = useState([]);
  const [customNodeInput, setCustomNodeInput] = useState("");
  const [customEdgeInput, setCustomEdgeInput] = useState("");
  const [rootNode, setRootNode] = useState(null);
  const [goalNode, setGoalNode] = useState(null);

  useEffect(() => {
    if (view === "default") {
      const defaultTree = {
        id: "1",
        children: [
          { id: "2", children: [{ id: "4" }, { id: "5" }] },
          { id: "3", children: [{ id: "6" }, { id: "7" }] },
        ],
      };
      setTreeData(defaultTree);
      setRootNode("1"); // Default root node
      setGoalNode("7"); // Default goal node
    }
  }, [view]);

  useEffect(() => {
    if (view === "custom") drawGraph();
    else if (treeData) drawTree();
  }, [view, treeData, graph, visitedNodes, backtrackedNodes]);

  const drawTree = () => {
    const width = 1000;
    const height = 600;
  
    const svg = d3
      .select("#tree-container")
      .selectAll("svg")
      .data([null])
      .join("svg")
      .attr("width", width)
      .attr("height", height);
  
    const root = d3.hierarchy(treeData);
  
    const treeLayout = d3.tree().size([width - 100, height - 150]);
    treeLayout(root);
  
    const yShift = 50; // Amount to shift the tree downward
  
    svg
      .selectAll("line")
      .data(root.links())
      .join("line")
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y + yShift) // Apply vertical shift
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y + yShift) // Apply vertical shift
      .attr("stroke", "#ccc")
      .attr("stroke-width", 2);
  
    svg
      .selectAll("circle")
      .data(root.descendants())
      .join("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y + yShift) // Apply vertical shift
      .attr("r", 20)
      .attr("fill", (d) =>
        backtrackedNodes.includes(d.data.id)
          ? "gray"
          : visitedNodes.includes(d.data.id)
          ? "orange"
          : "#007bff"
      )
      .attr("stroke", "#333")
      .attr("stroke-width", 2);
  
    svg
      .selectAll("text")
      .data(root.descendants())
      .join("text")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y + 5 + yShift) // Apply vertical shift
      .attr("text-anchor", "middle")
      .attr("fill", "#fff")
      .attr("font-size", "14px")
      .text((d) => d.data.id);
  };
  

  const drawGraph = () => {
    const width = 1000;
    const height = 600;

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

  const dfsTraversalForTree = async (node, goal) => {
    if (!node) return;
  
    const traversalSteps = [];
    const visited = new Set();
    const backtracked = [];
  
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
    const dfs = async (currentNode) => {
      if (!currentNode || visited.has(currentNode.id)) return;
  
      // Mark as visited
      visited.add(currentNode.id);
      setVisitedNodes((prev) => [...prev, currentNode.id]);
      traversalSteps.push(`Visited node ${currentNode.id}`);
      await delay(500);
  
      if (currentNode.id === goal) {
        traversalSteps.push(`Goal node ${goal} found!`);
        setSteps([...traversalSteps]);
        return true;
      }
  
      for (const child of currentNode.children || []) {
        if (await dfs(child)) return true;
      }
  
      // Mark as backtracked
      backtracked.push(currentNode.id);
      setBacktrackedNodes((prev) => [...prev, currentNode.id]);
      traversalSteps.push(`Backtracked from node ${currentNode.id}`);
      await delay(500);
    };
  
    await dfs(node);
    setSteps([...traversalSteps]);
  };
  
  const handleDefaultDFS = () => {
    if (treeData && rootNode && goalNode) {
      setVisitedNodes([]); // Clear visited nodes
      setBacktrackedNodes([]); // Clear backtracked nodes
      const root = treeData; // Root of the tree
      dfsTraversalForTree(root, goalNode); // Start DFS traversal
    } else {
      alert("Invalid root or goal node in the default tree.");
    }
  };
  const dfsTraversal = async (source, goal) => {
    const stack = [];
    const visited = new Set();
    const traversalSteps = [];
  
    stack.push(source);
    traversalSteps.push(`Pushed starting node ${source} onto the stack.`);
  
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
    while (stack.length > 0) {
      const current = stack.pop();
      traversalSteps.push(`Popped node ${current} from the stack.`);
  
      if (visited.has(current)) continue;
      visited.add(current);
      setVisitedNodes((prev) => [...prev, current]);
      await delay(500);
  
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
        stack.push(neighbor);
        traversalSteps.push(`Pushed node ${neighbor} onto the stack.`);
      });
  
      setSteps([...traversalSteps]);
    }
  
    traversalSteps.push("Traversal complete! Goal node not found.");
    setSteps([...traversalSteps]);
  };
  
  const handleCustomNodes = () => {
    const nodeIds = customNodeInput
      .split(",")
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id) && id !== "");

    const newNodes = nodeIds.map((id) => ({
      id,
      x: Math.random() * 500 + 50,
      y: Math.random() * 300 + 50,
    }));

    setGraph((prevGraph) => ({
      nodes: newNodes,
      edges: prevGraph.edges, // Retain existing edges
    }));

    setVisitedNodes([]);
    setSteps([]);
  };

  const handleCustomEdges = () => {
    const edgeConnections = customEdgeInput
      .split(";")
      .map((edge) => edge.split("-").map((id) => parseInt(id.trim())));

    const newEdges = edgeConnections
      .filter(([source, target]) => !isNaN(source) && !isNaN(target))
      .map(([source, target]) => ({ source, target }));

    setGraph((prevGraph) => ({
      nodes: prevGraph.nodes, // Retain existing nodes
      edges: newEdges,
    }));

    setVisitedNodes([]);
    setSteps([]);
  };

  const generateRandomConnectedGraph = () => {
    const numNodes = 6;
    const newNodes = Array.from({ length: numNodes }, (_, i) => ({
      id: i + 1,
      x: Math.random() * 500 + 50,
      y: Math.random() * 300 + 50,
    }));

    const newEdges = [];
    for (let i = 0; i < numNodes - 1; i++) {
      newEdges.push({ source: newNodes[i].id, target: newNodes[i + 1].id });
    }

    setGraph({ nodes: newNodes, edges: newEdges });
    setVisitedNodes([]);
    setSteps([]);
    setRootNode(null);
    setGoalNode(null);
  };

  return (
    <div className="DFSVisualization">
      {view === "default" ? (
        <>
          <h1>Default DFS Visualization</h1>
          <div id="tree-container"></div>
          <button onClick={handleDefaultDFS} className="action-button">
            Start DFS
          </button>
          <div className="steps-container">
            <h2>Traversal Steps:</h2>
            <ul>
              {steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
          <button onClick={() => setView("custom")} className="action-button">
            Custom Use
          </button>
        </>
      ) : (
        <>
        <div>
  <h1>Custom DFS Visualization</h1>
  <div id="graph-container"></div>
  <div className="horizontal-container">
    <button onClick={generateRandomConnectedGraph} className="action-button">
      Generate Random Graph
    </button>
    <div>
      <h3>Custom Nodes:</h3>
      <input
        type="text"
        value={customNodeInput}
        onChange={(e) => setCustomNodeInput(e.target.value)}
        className="input-field"
      />
      <button onClick={handleCustomNodes} className="action-button">
        Set Nodes
      </button>
    </div>
    <div>
      <h3>Custom Edges:</h3>
      <input
        type="text"
        value={customEdgeInput}
        onChange={(e) => setCustomEdgeInput(e.target.value)}
        className="input-field"
      />
      <button onClick={handleCustomEdges} className="action-button">
        Set Edges
      </button>
    </div>
    <div>
      <h3>Root Node:</h3>
      <input
        type="number"
        value={rootNode || ""}
        onChange={(e) => setRootNode(parseInt(e.target.value))}
        className="input-field"
      />
    </div>
    <div>
      <h3>Goal Node:</h3>
      <input
        type="number"
        value={goalNode || ""}
        onChange={(e) => setGoalNode(parseInt(e.target.value))}
        className="input-field"
      />
    </div>
    <button
      onClick={() =>
        rootNode && goalNode
          ? dfsTraversal(rootNode, goalNode)
          : alert("Please enter valid root and goal nodes.")
      }
      className="action-button"
    >
      Start DFS
    </button>
    <button onClick={() => setView("default")} className="action-button">
      Back to Default View
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

          <button onClick={() => setView("default")} className="action-button">
            Back to Default View
          </button>
        </>
      )}
    </div>
  );
};

export default DFSVisualization;
