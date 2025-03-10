import React, { useState } from "react";
import "./BubbleSortTutorial.css";

const BubbleSortTutorial = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Introduction",
      content: [
        "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
        "This process is repeated until the list is sorted."
      ],
    },
    {
      title: "Why Use Bubble Sort?",
      content: [
        "Bubble Sort is easy to understand and implement.",
        "It works well for small datasets where simplicity and clarity are important."
      ],
    },
    {
      title: "Step-by-Step Process",
      content: [
        "1. Start with the first two elements in the array.",
        "2. Compare them. If the first is greater than the second, swap them.",
        "3. Move to the next pair of elements and repeat the process.",
        "4. Continue this for all elements in the array.",
        "5. After each pass, the largest unsorted element moves to its correct position.",
        "6. Repeat until the array is fully sorted."
      ],
    },
    {
      title: "How to Use the Visualization",
      content: [
        "1. Click 'Generate Array' to create a new random array.",
        "2. Adjust the sorting speed using the slider.",
        "3. Click 'Bubble Sort' to see the algorithm in action.",
        "4. Observe the bars being compared (red) and the sorted ones (green).",
        "5. Click 'Reset' to reset the grid and try again."
      ],
    },
    {
      title: "Complexity",
      content: [
        "Time Complexity: O(n^2) for the worst and average case, O(n) for the best case (already sorted array).",
        "Space Complexity: O(1), as it is an in-place sorting algorithm."
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
        <ol>
          {tutorialSteps[currentStep].content.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ol>
        <div className="tutorial-buttons">
          <button onClick={handleBack} disabled={currentStep === 0}>
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === tutorialSteps.length - 1}
          >
            Next
          </button>
          <button onClick={onClose} className="close-button">
            Close Tutorial
          </button>
        </div>
      </div>
    </div>
  );
};

export default BubbleSortTutorial;
