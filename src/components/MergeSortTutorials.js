import React, { useState } from "react";
import "./MergeSortTutorials.css";

const MergeSortTutorials = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "What is Merge Sort?",
      content: [
        "Merge Sort is a highly efficient and stable sorting algorithm based on the divide-and-conquer approach.",
        "It splits an array into smaller parts, sorts them individually, and merges them back together to form the sorted array.",
      ],
    },
    {
      title: "Why is Merge Sort Needed?",
      content: [
        "Merge Sort is preferred for sorting large datasets because of its consistent O(n log n) time complexity.",
        "It excels in scenarios where stability and predictable performance are essential.",
      ],
    },
    {
      title: "How Does Merge Sort Work?",
      content: [
        "1. Divide: Split the array into two halves.",
        "2. Conquer: Recursively sort each subarray.",
        "3. Merge: Combine sorted subarrays into a single sorted array.",
        "This process continues until the entire array is sorted.",
      ],
    },
    {
      title: "How Does This Program Operate?",
      content: [
        "1. The program generates a random array or allows custom user input.",
        "2. The array is visualized as bars, representing the elements.",
        "3. The algorithm visually splits and merges the bars, using colors to indicate progress:",
        "   - Red: Elements being compared.",
        "   - Blue: Default (unsorted) elements.",
        "   - Green: Sorted elements.",
        "4. Real-time comments explain each step of the algorithm.",
      ],
    },
    {
      title: "Time Complexity",
      content: [
        "Merge Sort has a time complexity of O(n log n) in all cases: best, average, and worst.",
        "This makes it reliable for large datasets.",
      ],
    },
    {
      title: "Advantages",
      content: [
        "Merge Sort is a stable sorting algorithm.",
        "It has predictable performance with consistent time complexity.",
        "Efficient for large datasets and linked lists.",
      ],
    },
    {
      title: "Limitations",
      content: [
        "Requires additional memory for merging, resulting in O(n) space complexity.",
        "May not be the most efficient for small datasets compared to algorithms like Quick Sort.",
      ],
    },
  ];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-box">
        <h2>{tutorialSteps[currentStep].title}</h2>
        <ul>
          {tutorialSteps[currentStep].content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <div className="tutorial-controls">
          <button onClick={handleBack} disabled={currentStep === 0}>
            Back
          </button>
          <button onClick={handleNext} disabled={currentStep === tutorialSteps.length - 1}>
            Next
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default MergeSortTutorials;
