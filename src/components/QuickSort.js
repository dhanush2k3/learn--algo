import React, { useEffect, useRef } from "react";

const QuickSort = ({ array, speed, isPaused }) => {
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const quickSort = async (arr, left = 0, right = arr.length - 1) => {
      if (left < right) {
        const pivotIndex = await partition(arr, left, right);
        await quickSort(arr, left, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, right);
      }
    };

    const partition = async (arr, left, right) => {
      const bars = document.querySelectorAll(".bar");
      const delay = 1000 - speed;
      const colors = ["red", "blue", "yellow"]; // Define consistent colors
      const pivot = arr[right];
      let i = left - 1;

      const checkPaused = async () => {
        while (isPausedRef.current) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      };

      for (let j = left; j < right; j++) {
        await checkPaused();

        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];

          // Change colors during swapping
          if (bars[i])
            bars[i].style.backgroundColor = colors[i % colors.length];
          if (bars[j])
            bars[j].style.backgroundColor = colors[j % colors.length];

          // Update bar heights and values
          if (bars[i]) {
            bars[i].style.height = `${arr[i] * 3}px`;
            if (bars[i].querySelector("span")) {
              bars[i].querySelector("span").textContent = arr[i];
            }
          }
          if (bars[j]) {
            bars[j].style.height = `${arr[j] * 3}px`;
            if (bars[j].querySelector("span")) {
              bars[j].querySelector("span").textContent = arr[j];
            }
          }

          await new Promise((resolve) => setTimeout(resolve, delay));

          // Reset colors after swapping
          if (bars[i]) bars[i].style.backgroundColor = "";
          if (bars[j]) bars[j].style.backgroundColor = "";
        }
      }

      [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
      // Update bar heights and values
      if (bars[i + 1]) {
        bars[i + 1].style.height = `${arr[i + 1] * 3}px`;
        if (bars[i + 1].querySelector("span")) {
          bars[i + 1].querySelector("span").textContent = arr[i + 1];
        }
      }
      if (bars[right]) {
        bars[right].style.height = `${arr[right] * 3}px`;
        if (bars[right].querySelector("span")) {
          bars[right].querySelector("span").textContent = arr[right];
        }
      }

      return i + 1;
    };

    quickSort([...array]);
  }, [array, speed]);

  return null;
};

export default QuickSort;
