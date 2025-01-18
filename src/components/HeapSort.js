import { useEffect, useRef } from "react";

const HeapSort = ({ array, speed, isPaused }) => {
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const heapSort = async (arr) => {
      const bars = document.querySelectorAll(".bar");
      const delay = speed;

      const heapify = async (arr, n, i) => {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) {
          largest = left;
        }

        if (right < n && arr[right] > arr[largest]) {
          largest = right;
        }

        if (largest !== i) {
          [arr[i], arr[largest]] = [arr[largest], arr[i]];
          bars[i].style.height = `${arr[i] * 3}px`;
          bars[largest].style.height = `${arr[largest] * 3}px`;

          bars[i].textContent = arr[i];
          bars[largest].textContent = arr[largest];

          bars[i].style.backgroundColor = "red";
          bars[largest].style.backgroundColor = "red";

          await new Promise((resolve) => setTimeout(resolve, delay));
          bars[i].style.backgroundColor = "#7b1fa2"; // Reset color
          bars[largest].style.backgroundColor = "#7b1fa2"; // Reset color

          await heapify(arr, n, largest);
        }
      };

      for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
        await heapify(arr, arr.length, i);
      }

      for (let i = arr.length - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        bars[0].style.height = `${arr[0] * 3}px`;
        bars[i].style.height = `${arr[i] * 3}px`;

        bars[0].textContent = arr[0];
        bars[i].textContent = arr[i];

        bars[0].style.backgroundColor = "green";
        bars[i].style.backgroundColor = "green";

        await new Promise((resolve) => setTimeout(resolve, delay));
        bars[0].style.backgroundColor = "#7b1fa2"; // Reset color
        bars[i].style.backgroundColor = "#7b1fa2"; // Reset color

        await heapify(arr, i, 0);
      }
    };

    heapSort([...array]);
  }, [array, speed]);

  return null;
};

export default HeapSort;
