import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SortingPage from "./components/SortingPage";
import PathFindingPage from "./components/PathFindingPage";
import HomePage from "./components/HomePage";
import BubbleSortVisualization from "./components/BubbleSortVisualization";
import MergeSortVisualization from "./components/MergeSortVisualization";
import QuickSortVisualization from "./components/QuickSortVisualization";
import SelectionSortVisualization from "./components/SelectionSortVisualization";
import InsertionSortVisualization from "./components/InsertionSortVisualization";
import Chatbot from "./components/Chatbot"; // Import Chatbot component
import HeapSortVisualization from "./components/heapvisulization";
import GraphTraversalPage from "./components/GraphTraversalPage";
import ArraysPage from "./components/ArraysPage";
import OpenAIChat from "./components/OpenAIChat";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Sorting Page */}
          <Route path="/sorting" element={<SortingPage />} />

          {/* Bubble Sort Visualization */}
          <Route path="/sorting/bubble-sort" element={<BubbleSortVisualization />} />

          {/* Pathfinding Page */}
          <Route path="/path-finding" element={<PathFindingPage />} />

          {/* Merge Sort */}
          <Route path="/sorting/merge-sort" element={<MergeSortVisualization />} />

          {/* Quick Sort */}
          <Route path="/sorting/quick-sort" element={<QuickSortVisualization />} />

          {/* Selection Sort */}
          <Route path="/sorting/selection-sort" element={<SelectionSortVisualization />} />

          {/* Insertion Sort */}
          <Route path="/sorting/insertion-sort" element={<InsertionSortVisualization />} />
            {/* heap Sort */}
            <Route path="/sorting/heap-sort" element={<HeapSortVisualization/>} />
            {/* Graph Travesal page */}
            <Route path="/graph-traversal" element={<GraphTraversalPage />} />
            <Route path="/arrays" element={<ArraysPage />} />

          
        </Routes>

        {/* Chatbot Component */}
        <Chatbot />
        <OpenAIChat /> {/* Add Chatbot globally */}
      </div>
    </Router>
  );
}

export default App;

