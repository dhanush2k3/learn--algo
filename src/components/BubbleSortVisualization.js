import React, { useState, useEffect } from "react";
import "./BubbleSortVisualization.css";

const BubbleSortVisualization = ({ array, speed }) => {
  const [isSorting, setIsSorting] = useState(false); // Tracks whether sorting is active
  const [dataArray, setDataArray] = useState([...array]);

  useEffect(() => {
    // Sync the local array with the parent array whenever it changes
    setDataArray([...array]);
  }, [array]);

  // Bubble Sort with Visualization
  const bubbleSort = async () => {
    setIsSorting(true); // Disable controls while sorting
    const arrayCopy = [...dataArray];
    const bars = document.getElementsByClassName("bar");

    for (let i = 0; i < arrayCopy.length - 1; i++) {
      for (let j = 0; j < arrayCopy.length - 1 - i; j++) {
        // Guard clause to avoid undefined elements
        if (!bars[j] || !bars[j + 1]) continue;

        // Highlight the bars being compared
        bars[j].style.backgroundColor = "red";
        bars[j + 1].style.backgroundColor = "red";

        // Pause for visualization
        await new Promise((resolve) => setTimeout(resolve, speed));

        if (arrayCopy[j] > arrayCopy[j + 1]) {
          // Swap the array values
          [arrayCopy[j], arrayCopy[j + 1]] = [arrayCopy[j + 1], arrayCopy[j]];

          // Update the DOM heights to reflect the swap
          bars[j].style.height = `${arrayCopy[j] * 3}px`;
          bars[j + 1].style.height = `${arrayCopy[j + 1] * 3}px`;
        }

        // Reset bar colors
        bars[j].style.backgroundColor = "blue";
        bars[j + 1].style.backgroundColor = "blue";
      }

      // Mark the sorted part in green
      if (bars[arrayCopy.length - 1 - i]) {
        bars[arrayCopy.length - 1 - i].style.backgroundColor = "green";
      }
    }

    // Mark all bars as sorted at the end
    for (let i = 0; i < arrayCopy.length; i++) {
      if (bars[i]) bars[i].style.backgroundColor = "green";
    }

    setDataArray(arrayCopy); // Update the state with the sorted array
    setIsSorting(false); // Enable controls after sorting
  };

  return (
    <div className="bubble-sort-visualization">
      <div className="bars-container">
        {dataArray.map((value, index) => (
          <div
            key={index}
            className="bar"
            style={{ height: `${value * 3}px` }}
          ></div>
        ))}
      </div>
      <div className="controls">
        <button onClick={bubbleSort} disabled={isSorting}>
          Start Bubble Sort
        </button>
        <button
          onClick={() => setDataArray([...array])}
          disabled={isSorting}
        >
          Reset Array
        </button>
      </div>
    </div>
  );
};

export default BubbleSortVisualization;
