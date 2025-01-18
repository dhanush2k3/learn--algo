import { useEffect, useRef } from "react";

const InsertionSort = ({ array, speed, isPaused }) => {
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const insertionSort = async (arr) => {
      const bars = document.querySelectorAll(".bar");
      const delay = speed;

      for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        bars[i].style.backgroundColor = "yellow"; // Highlight key

        while (j >= 0 && arr[j] > key) {
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

          bars[j + 1].style.backgroundColor = "red"; // Highlight comparison
          arr[j + 1] = arr[j];
          bars[j + 1].style.height = `${arr[j + 1] * 3}px`;
          bars[j + 1].textContent = arr[j + 1];

          await new Promise((resolve) => setTimeout(resolve, delay));
          bars[j + 1].style.backgroundColor = "#7b1fa2"; // Reset color
          j--;
        }

        arr[j + 1] = key;
        bars[j + 1].style.height = `${key * 3}px`;
        bars[j + 1].textContent = key;

        bars[i].style.backgroundColor = "#7b1fa2"; // Reset color
      }
    };

    insertionSort([...array]);
  }, [array, speed]);

  return null;
};

export default InsertionSort;
