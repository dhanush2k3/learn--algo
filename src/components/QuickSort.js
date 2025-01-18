import { useEffect, useRef } from "react";

const QuickSort = ({ array, speed, isPaused }) => {
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const quickSort = async (arr, left = 0, right = arr.length - 1) => {
      const bars = document.querySelectorAll(".bar");
      const delay = speed;

      const partition = async (arr, left, right) => {
        let pivotIndex = left;
        const pivotValue = arr[right];
        bars[right].style.backgroundColor = "yellow"; // Highlight pivot

        for (let i = left; i < right; i++) {
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

          bars[i].style.backgroundColor = "red"; // Highlight comparison

          if (arr[i] < pivotValue) {
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            bars[i].style.height = `${arr[i] * 3}px`;
            bars[pivotIndex].style.height = `${arr[pivotIndex] * 3}px`;

            bars[i].textContent = arr[i];
            bars[pivotIndex].textContent = arr[pivotIndex];

            bars[pivotIndex].style.backgroundColor = "green"; // Highlight swap
            pivotIndex++;
          }

          await new Promise((resolve) => setTimeout(resolve, delay));
          bars[i].style.backgroundColor = "#7b1fa2"; // Reset color
        }

        [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];
        bars[pivotIndex].style.height = `${arr[pivotIndex] * 3}px`;
        bars[right].style.height = `${arr[right] * 3}px`;

        bars[pivotIndex].textContent = arr[pivotIndex];
        bars[right].textContent = arr[right];

        bars[right].style.backgroundColor = "#7b1fa2"; // Reset color

        return pivotIndex;
      };

      if (left < right) {
        const pivotIndex = await partition(arr, left, right);
        await Promise.all([
          quickSort(arr, left, pivotIndex - 1),
          quickSort(arr, pivotIndex + 1, right),
        ]);
      }
    };

    quickSort([...array]);
  }, [array, speed]);

  return null;
};

export default QuickSort;
