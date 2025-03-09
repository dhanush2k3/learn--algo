import React, { useEffect, useRef } from "react";

const BubbleSort = ({ array, speed, isPaused }) => {
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const bubbleSort = async (arr) => {
      const bars = document.querySelectorAll(".bar");
      const delay = 1000 - speed;
      let swapped;
      const colors = ["red", "blue", "yellow"]; // Define consistent colors

      const checkPaused = async () => {
        while (isPausedRef.current) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      };

      do {
        swapped = false;
        for (let i = 0; i < arr.length - 1; i++) {
          await checkPaused();

          if (arr[i] > arr[i + 1]) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            swapped = true;

            // Change colors during swapping
            if (bars[i])
              bars[i].style.backgroundColor = colors[i % colors.length];
            if (bars[i + 1])
              bars[i + 1].style.backgroundColor =
                colors[(i + 1) % colors.length];

            // Update bar heights and values
            if (bars[i]) {
              bars[i].style.height = `${arr[i] * 3}px`;
              if (bars[i].querySelector("span")) {
                bars[i].querySelector("span").textContent = arr[i];
              }
            }
            if (bars[i + 1]) {
              bars[i + 1].style.height = `${arr[i + 1] * 3}px`;
              if (bars[i + 1].querySelector("span")) {
                bars[i + 1].querySelector("span").textContent = arr[i + 1];
              }
            }

            await new Promise((resolve) => setTimeout(resolve, delay));

            // Reset colors after swapping
            if (bars[i]) bars[i].style.backgroundColor = "";
            if (bars[i + 1]) bars[i + 1].style.backgroundColor = "";
          }
        }
      } while (swapped);
    };

    bubbleSort([...array]);
  }, [array, speed]);

  return null;
};

export default BubbleSort;
