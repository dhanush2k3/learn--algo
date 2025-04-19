import React, { useState } from "react";
import "./SelectionSortTutorials.css";

const SelectionSortTutorials = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "What is Selection Sort?",
      content: [
        "Selection Sort is a simple and intuitive sorting algorithm.",
        "It repeatedly finds the smallest (or largest) element from the unsorted part of the array and places it in its correct position.",
      ],
    },
    {
      title: "Why is Selection Sort Needed?",
      content: [
        "Selection Sort is best for educational purposes because of its straightforward approach.",
        "It works efficiently for small datasets where simplicity is a priority over performance.",
      ],
    },
    {
      title: "How Does Selection Sort Work?",
      content: [
        "1. Find the smallest element in the unsorted portion of the array.",
        "2. Swap it with the first element of the unsorted portion.",
        "3. Repeat the process for the remaining unsorted portion until the array is completely sorted.",
      ],
    },
    {
      title: "How Does This Program Operate?",
      content: [
        "1. The program generates a random array or accepts custom user input.",
        "2. The array is visualized as bars, representing the elements.",
        "3. The algorithm highlights comparisons in orange and sorted elements in green.",
        "4. Real-time comments explain each step of the sorting process.",
      ],
    },
    {
      title: "Time Complexity",
      content: [
        "Selection Sort has a time complexity of O(n²) in the worst, average, and best cases.",
        "It is not suitable for large datasets due to its inefficiency.",
      ],
    },
    {
      title: "Advantages",
      content: [
        "Simple and easy to understand.",
        "Does not require additional memory, making it an in-place sorting algorithm.",
      ],
    },
    {
      title: "Limitations",
      content: [
        "Inefficient for large datasets due to O(n²) time complexity.",
        "Slower compared to more advanced algorithms like Merge Sort and Quick Sort.",
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

export default SelectionSortTutorials;
