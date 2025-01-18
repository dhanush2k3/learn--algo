import React, { useEffect, useRef } from "react";

const BubbleSort = ({ array, speed, isPaused }) => {
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const bubbleSort = async (arr) => {
      const bars = document.querySelectorAll(".bar");
      const delay = speed;
      let swapped;

      do {
        swapped = false;
        for (let i = 0; i < arr.length - 1; i++) {
          if (isPausedRef.current) {
            await new Promise((resolve) => setTimeout(resolve, 100));
          }

          if (arr[i] > arr[i + 1]) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            swapped = true;

            // Update bar heights
            if (bars[i]) {
              bars[i].style.height = `${arr[i] * 3}px`;
            }
            if (bars[i + 1]) {
              bars[i + 1].style.height = `${arr[i + 1] * 3}px`;
            }

            // Update bar values
            if (bars[i] && bars[i].querySelector("span")) {
              bars[i].querySelector("span").textContent = arr[i];
            }
            if (bars[i + 1] && bars[i + 1].querySelector("span")) {
              bars[i + 1].querySelector("span").textContent = arr[i + 1];
            }

            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      } while (swapped);
    };

    bubbleSort([...array]);
  }, [array, speed]);

  return null;
};

export default BubbleSort;
