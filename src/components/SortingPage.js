import React, { useState, useEffect } from "react";
import SortingControlPanel from "./SortingControlPanel";
import BubbleSort from "./BubbleSort";
import QuickSort from "./QuickSort";
import MergeSort from "./MergeSort";
import SelectionSort from "./SelectionSort";
import InsertionSort from "./InsertionSort";
import HeapSort from "./HeapSort";
import "./SortingPage.css";

const SortingPage = () => {
  const [dataArray, setArray] = useState([]);
  const [speedValue, setSpeed] = useState(500);
  const [algorithm, setAlgorithm] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    handleGenerateArray(); // Generate a random array on initial load
  }, []);

  const handleGenerateArray = () => {
    setIsPaused(true); // Pause sorting when generating a new array
    const newArray = Array.from(
      { length: 10 },
      () => Math.floor(Math.random() * 100) + 1
    ); // Generate a random array of size 10
    setArray(newArray);
  };

  const handleStartAlgorithm = (algo) => {
    setIsPaused(false);
    setAlgorithm(algo);
  };

  const handleReset = () => {
    setIsPaused(true);
    setArray([]);
    setAlgorithm(null);
  };

  return (
    <div className="SortingPage">
      <div className="Visualization">
        {dataArray.map((value, index) => (
          <div key={index} className="bar" style={{ height: `${value * 3}px` }}>
            <span>{value}</span> {/* Ensure numbers are displayed */}
          </div>
        ))}
      </div>
      {algorithm === "bubbleSort" && (
        <BubbleSort array={dataArray} speed={speedValue} isPaused={isPaused} />
      )}
      {algorithm === "quickSort" && (
        <QuickSort array={dataArray} speed={speedValue} isPaused={isPaused} />
      )}
      {algorithm === "mergeSort" && (
        <MergeSort array={dataArray} speed={speedValue} isPaused={isPaused} />
      )}
      {algorithm === "selectionSort" && (
        <SelectionSort
          array={dataArray}
          speed={speedValue}
          isPaused={isPaused}
        />
      )}
      {algorithm === "insertionSort" && (
        <InsertionSort
          array={dataArray}
          speed={speedValue}
          isPaused={isPaused}
        />
      )}
      {algorithm === "heapSort" && (
        <HeapSort array={dataArray} speed={speedValue} isPaused={isPaused} />
      )}
      <SortingControlPanel
        setArray={setArray}
        setSpeed={setSpeed}
        handleStartAlgorithm={handleStartAlgorithm}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        handleReset={handleReset}
      />
    </div>
  );
};

export default SortingPage;
