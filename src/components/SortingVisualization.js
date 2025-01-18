import React from "react";
import BubbleSort from "./BubbleSort";
import QuickSort from "./QuickSort";
import MergeSort from "./MergeSort";
import SelectionSort from "./SelectionSort";
import InsertionSort from "./InsertionSort";
import HeapSort from "./HeapSort";
import "./SortingPage.css";

const SortingVisualization = ({ array, speed, algorithm, isPaused }) => {
  return (
    <div className="SortingVisualization">
      {array.map((value, index) => (
        <div key={index} className="bar" style={{ height: `${value * 3}px` }}>
          {value}
        </div>
      ))}
      {algorithm === "bubbleSort" && (
        <BubbleSort array={array} speed={speed} isPaused={isPaused} />
      )}
      {algorithm === "quickSort" && (
        <QuickSort array={array} speed={speed} isPaused={isPaused} />
      )}
      {algorithm === "mergeSort" && (
        <MergeSort array={array} speed={speed} isPaused={isPaused} />
      )}
      {algorithm === "selectionSort" && (
        <SelectionSort array={array} speed={speed} isPaused={isPaused} />
      )}
      {algorithm === "insertionSort" && (
        <InsertionSort array={array} speed={speed} isPaused={isPaused} />
      )}
      {algorithm === "heapSort" && (
        <HeapSort array={array} speed={speed} isPaused={isPaused} />
      )}
    </div>
  );
};

export default SortingVisualization;
