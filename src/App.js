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
          {/* Merege sort */}
          <Route path="/sorting/merge-sort" element={<MergeSortVisualization/>}/>
          {/* quick sort */}
          <Route path="/sorting/quick-sort" element={<QuickSortVisualization/>}/>

            {/* selection sort */}
            <Route path="/sorting/selection-sort" element={<SelectionSortVisualization/>}/>
             {/* selection sort */}
             <Route path="/sorting/insertion-sort" element={<InsertionSortVisualization/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
