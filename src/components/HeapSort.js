import React, { useEffect, useRef } from "react";

const HeapSort = ({ array, speed, isPaused }) => {
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const heapSort = async (arr) => {
      const bars = document.querySelectorAll(".bar");
      const delay = 1000 - speed;
      const colors = ["red", "blue", "yellow"]; // Define consistent colors

      const checkPaused = async () => {
        while (isPausedRef.current) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      };

      const heapify = async (arr, n, i) => {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;

        if (largest !== i) {
          [arr[i], arr[largest]] = [arr[largest], arr[i]];

          // Change colors during heapify
          if (bars[i])
            bars[i].style.backgroundColor = colors[i % colors.length];
          if (bars[largest])
            bars[largest].style.backgroundColor =
              colors[largest % colors.length];

          // Update bar heights and values
          if (bars[i]) {
            bars[i].style.height = `${arr[i] * 3}px`;
            if (bars[i].querySelector("span"))
              bars[i].querySelector("span").textContent = arr[i];
          }
          if (bars[largest]) {
            bars[largest].style.height = `${arr[largest] * 3}px`;
            if (bars[largest].querySelector("span"))
              bars[largest].querySelector("span").textContent = arr[largest];
          }

          await new Promise((resolve) => setTimeout(resolve, delay));
          await checkPaused();
          await heapify(arr, n, largest);

          // Reset colors after heapify
          if (bars[i]) bars[i].style.backgroundColor = "";
          if (bars[largest]) bars[largest].style.backgroundColor = "";
        }
      };

      const buildHeap = async (arr, n) => {
        const startIndex = Math.floor(n / 2) - 1;
        for (let i = startIndex; i >= 0; i--) {
          await heapify(arr, n, i);
        }
      };

      const sort = async (arr) => {
        const n = arr.length;

        await buildHeap(arr, n);

        for (let i = n - 1; i > 0; i--) {
          [arr[0], arr[i]] = [arr[i], arr[0]];

          // Update bar heights and values
          if (bars[0]) {
            bars[0].style.height = `${arr[0] * 3}px`;
            if (bars[0].querySelector("span"))
              bars[0].querySelector("span").textContent = arr[0];
          }
          if (bars[i]) {
            bars[i].style.height = `${arr[i] * 3}px`;
            if (bars[i].querySelector("span"))
              bars[i].querySelector("span").textContent = arr[i];
          }

          await new Promise((resolve) => setTimeout(resolve, delay));
          await checkPaused();
          await heapify(arr, i, 0);
        }
      };

      sort([...array]);
    };

    heapSort([...array]);
  }, [array, speed]);

  return null;
};

export default HeapSort;
