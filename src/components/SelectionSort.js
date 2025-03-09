import React, { useEffect, useRef } from "react";

const SelectionSort = ({ array, speed, isPaused }) => {
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const selectionSort = async (arr) => {
      const bars = document.querySelectorAll(".bar");
      const delay = 1000 - speed;
      const colors = ["red", "blue", "yellow"]; // Define consistent colors

      const checkPaused = async () => {
        while (isPausedRef.current) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      };

      for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
          await checkPaused();

          if (arr[j] < arr[minIndex]) minIndex = j;
        }

        if (minIndex !== i) {
          [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

          // Change colors during swapping
          if (bars[i])
            bars[i].style.backgroundColor = colors[i % colors.length];
          if (bars[minIndex])
            bars[minIndex].style.backgroundColor =
              colors[minIndex % colors.length];

          // Update bar heights and values
          if (bars[i]) {
            bars[i].style.height = `${arr[i] * 3}px`;
            if (bars[i].querySelector("span"))
              bars[i].querySelector("span").textContent = arr[i];
          }
          if (bars[minIndex]) {
            bars[minIndex].style.height = `${arr[minIndex] * 3}px`;
            if (bars[minIndex].querySelector("span"))
              bars[minIndex].querySelector("span").textContent = arr[minIndex];
          }

          await new Promise((resolve) => setTimeout(resolve, delay));

          // Reset colors after swapping
          if (bars[i]) bars[i].style.backgroundColor = "";
          if (bars[minIndex]) bars[minIndex].style.backgroundColor = "";
        }
      }
    };

    selectionSort([...array]);
  }, [array, speed]);

  return null;
};

export default SelectionSort;
