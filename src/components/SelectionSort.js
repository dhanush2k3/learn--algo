import { useEffect, useRef } from "react";

const SelectionSort = ({ array, speed, isPaused }) => {
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const selectionSort = async (arr) => {
      const bars = document.querySelectorAll(".bar");
      const delay = speed;

      for (let i = 0; i < arr.length; i++) {
        if (isPausedRef.current) {
          await new Promise((resolve) => {
            const interval = setInterval(() => {
              if (!isPausedRef.current) {
                clearInterval(interval);
                resolve();
              }
            }, 100);
          });
        }

        let minIndex = i;
        bars[minIndex].style.backgroundColor = "yellow"; // Highlight minimum

        for (let j = i + 1; j < arr.length; j++) {
          bars[j].style.backgroundColor = "red"; // Highlight comparison

          if (arr[j] < arr[minIndex]) {
            bars[minIndex].style.backgroundColor = "#7b1fa2"; // Reset color
            minIndex = j;
            bars[minIndex].style.backgroundColor = "yellow"; // Highlight new minimum
          }

          await new Promise((resolve) => setTimeout(resolve, delay));
          bars[j].style.backgroundColor = "#7b1fa2"; // Reset color
        }

        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        bars[i].style.height = `${arr[i] * 3}px`;
        bars[minIndex].style.height = `${arr[minIndex] * 3}px`;

        bars[i].textContent = arr[i];
        bars[minIndex].textContent = arr[minIndex];

        bars[minIndex].style.backgroundColor = "#7b1fa2"; // Reset color
        bars[i].style.backgroundColor = "green"; // Highlight sorted
      }
    };

    selectionSort([...array]);
  }, [array, speed]);

  return null;
};

export default SelectionSort;
