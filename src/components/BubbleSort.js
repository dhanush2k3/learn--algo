import React, { useState, useEffect } from "react";
import "./BubbleSort.css";

const BubbleSort = ({ array, speed, isPaused }) => {
  const [sortedArray, setSortedArray] = useState([...array]);
  const [isSorting, setIsSorting] = useState(false); // Tracks sorting state

  useEffect(() => {
    // Sync sortedArray with the latest array when it's updated
    setSortedArray([...array]);

    // Reset all bar colors when the array changes
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = "blue";
    }
  }, [array]);

  // Bubble Sort Algorithm with Visualization
  const bubbleSort = async () => {
    setIsSorting(true); // Prevent multiple sorts while active
    const arrayCopy = [...sortedArray];
    const bars = document.getElementsByClassName("bar");

    if (!bars || bars.length === 0) {
      console.error("Bars not found in the DOM");
      setIsSorting(false);
      return;
    }

    for (let i = 0; i < arrayCopy.length - 1; i++) {
      for (let j = 0; j < arrayCopy.length - 1 - i; j++) {
        if (!bars[j] || !bars[j + 1]) {
          console.error(`Undefined bar at index ${j}`);
          continue;
        }

        // Highlight the bars being compared
        bars[j].style.backgroundColor = "red";
        bars[j + 1].style.backgroundColor = "red";

        // Delay for visualization
        await new Promise((resolve) => setTimeout(resolve, speed));

        if (arrayCopy[j] > arrayCopy[j + 1]) {
          // Swap the array values
          [arrayCopy[j], arrayCopy[j + 1]] = [arrayCopy[j + 1], arrayCopy[j]];

          // Update bar heights in the DOM
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
      if (bars[i]) {
        bars[i].style.backgroundColor = "green";
      }
    }

    setSortedArray(arrayCopy); // Update the sorted array state
    setIsSorting(false); // Allow new sorts after completion
  };

  useEffect(() => {
    // Trigger Bubble Sort when not paused and sorting is requested
    if (!isPaused && !isSorting) {
      setTimeout(() => bubbleSort(), 100); // Add slight delay for updates
    }
  }, [isPaused]);

  return null; // Visualization is handled via parent component
};

export default BubbleSort;
