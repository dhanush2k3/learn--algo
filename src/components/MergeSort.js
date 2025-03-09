import React, { useEffect, useRef } from "react";

const MergeSort = ({ array, speed, isPaused }) => {
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const mergeSort = async (arr, l = 0, r = arr.length - 1) => {
      const bars = document.querySelectorAll(".bar");
      const delay = 1000 - speed;
      const colors = ["red", "blue", "yellow"]; // Define consistent colors

      const checkPaused = async () => {
        while (isPausedRef.current) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      };

      const merge = async (arr, l, m, r) => {
        const n1 = m - l + 1;
        const n2 = r - m;
        const L = new Array(n1);
        const R = new Array(n2);

        for (let i = 0; i < n1; i++) L[i] = arr[l + i];
        for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

        let i = 0,
          j = 0,
          k = l;

        while (i < n1 && j < n2) {
          await checkPaused();

          if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
          } else {
            arr[k] = R[j];
            j++;
          }

          // Change colors during merging
          if (bars[k])
            bars[k].style.backgroundColor = colors[k % colors.length];

          // Update bar heights and values
          if (bars[k]) {
            bars[k].style.height = `${arr[k] * 3}px`;
            if (bars[k].querySelector("span"))
              bars[k].querySelector("span").textContent = arr[k];
          }

          await new Promise((resolve) => setTimeout(resolve, delay));
          k++;
        }

        while (i < n1) {
          await checkPaused();

          arr[k] = L[i];

          if (bars[k])
            bars[k].style.backgroundColor = colors[k % colors.length];

          // Update bar heights and values
          if (bars[k]) {
            bars[k].style.height = `${arr[k] * 3}px`;
            if (bars[k].querySelector("span"))
              bars[k].querySelector("span").textContent = arr[k];
          }

          await new Promise((resolve) => setTimeout(resolve, delay));
          i++;
          k++;
        }

        while (j < n2) {
          await checkPaused();

          arr[k] = R[j];

          if (bars[k])
            bars[k].style.backgroundColor = colors[k % colors.length];

          // Update bar heights and values
          if (bars[k]) {
            bars[k].style.height = `${arr[k] * 3}px`;
            if (bars[k].querySelector("span"))
              bars[k].querySelector("span").textContent = arr[k];
          }

          await new Promise((resolve) => setTimeout(resolve, delay));
          j++;
          k++;
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
