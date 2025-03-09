import React, { useEffect, useRef } from "react";

const InsertionSort = ({ array, speed, isPaused }) => {
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const insertionSort = async (arr) => {
      const bars = document.querySelectorAll(".bar");
      const delay = 1000 - speed;
      const colors = ["red", "blue", "yellow"]; // Define consistent colors

      const checkPaused = async () => {
        while (isPausedRef.current) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      };

      for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
          await checkPaused();

          arr[j + 1] = arr[j];

          // Change colors during insertion
          if (bars[j + 1])
            bars[j + 1].style.backgroundColor = colors[(j + 1) % colors.length];

          // Update bar heights and values
          if (bars[j + 1]) {
            bars[j + 1].style.height = `${arr[j + 1] * 3}px`;
            if (bars[j + 1].querySelector("span"))
              bars[j + 1].querySelector("span").textContent = arr[j + 1];
          }

          await new Promise((resolve) => setTimeout(resolve, delay));
          j--;
        }

        arr[j + 1] = key;

        if (bars[j + 1]) {
          bars[j + 1].style.backgroundColor = colors[(j + 1) % colors.length];

          // Update bar heights and values
          if (bars[j + 1]) {
            bars[j + 1].style.height = `${arr[j + 1] * 3}px`;
            if (bars[j + 1].querySelector("span"))
              bars[j + 1].querySelector("span").textContent = arr[j + 1];
          }
        }

        // Reset colors after insertion
        for (let k = 0; k <= i; k++) {
          if (bars[k]) bars[k].style.backgroundColor = "";
        }
      }
    };

    insertionSort([...array]);
  }, [array, speed]);

  return null;
};

export default InsertionSort;
