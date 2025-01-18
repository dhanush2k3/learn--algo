import { useEffect, useRef } from "react";

const MergeSort = ({ array, speed, isPaused }) => {
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const mergeSort = async (arr, l = 0, r = arr.length - 1) => {
      const bars = document.querySelectorAll(".bar");
      const delay = speed;

      const merge = async (arr, l, m, r) => {
        const n1 = m - l + 1;
        const n2 = r - m;
        const L = new Array(n1);
        const R = new Array(n2);

        for (let i = 0; i < n1; i++) {
          L[i] = arr[l + i];
        }
        for (let j = 0; j < n2; j++) {
          R[j] = arr[m + 1 + j];
        }

        let i = 0,
          j = 0,
          k = l;

        while (i < n1 && j < n2) {
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

          const bar1 = bars[k];
          const bar2 = bars[k];
          if (bar1 && bar2) {
            bar1.style.backgroundColor = "red"; // Highlight comparison
            if (L[i] <= R[j]) {
              arr[k] = L[i];
              i++;
            } else {
              arr[k] = R[j];
              j++;
            }
            bar2.style.height = `${arr[k] * 3}px`;
            bar2.textContent = arr[k];
            await new Promise((resolve) => setTimeout(resolve, delay));
            bar2.style.backgroundColor = "#7b1fa2"; // Reset color
            k++;
          } else {
            console.error("Bar element not found");
          }
        }

        while (i < n1) {
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
          const bar = bars[k];
          if (bar) {
            bar.style.backgroundColor = "red"; // Highlight comparison
            arr[k] = L[i];
            bar.style.height = `${arr[k] * 3}px`;
            bar.textContent = arr[k];
            await new Promise((resolve) => setTimeout(resolve, delay));
            bar.style.backgroundColor = "#7b1fa2"; // Reset color
            i++;
            k++;
          } else {
            console.error("Bar element not found");
          }
        }

        while (j < n2) {
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
          const bar = bars[k];
          if (bar) {
            bar.style.backgroundColor = "red"; // Highlight comparison
            arr[k] = R[j];
            bar.style.height = `${arr[k] * 3}px`;
            bar.textContent = arr[k];
            await new Promise((resolve) => setTimeout(resolve, delay));
            bar.style.backgroundColor = "#7b1fa2"; // Reset color
            j++;
            k++;
          } else {
            console.error("Bar element not found");
          }
        }
      };

      if (l < r) {
        const m = Math.floor((l + r) / 2);
        await mergeSort(arr, l, m);
        await mergeSort(arr, m + 1, r);
        await merge(arr, l, m, r);
      }
    };

    mergeSort([...array]);
  }, [array, speed]);

  return null;
};

export default MergeSort;
