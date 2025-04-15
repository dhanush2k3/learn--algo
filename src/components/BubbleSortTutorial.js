import React, { useState } from "react";
import "./BubbleSortTutorial.css";

const BubbleSortTutorial = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "What is Bubble Sort?",
      content: [
        "Bubble Sort is a simple sorting algorithm that compares adjacent elements in a list and swaps them if they are out of order.",
        "The process repeats until the list is sorted, with the largest elements 'bubbling' to the top of the array.",
      ],
    },
    {
      title: "Why is Bubble Sort Needed?",
      content: [
        "Bubble Sort is easy to understand and implement, making it ideal for educational purposes.",
        "It demonstrates fundamental sorting concepts such as comparison and swapping.",
      ],
    },
    {
      title: "How Does Bubble Sort Work?",
      content: [
        "1. Start by comparing the first two elements in the array.",
        "2. Swap them if the first is larger than the second.",
        "3. Move to the next pair of elements and repeat.",
        "4. After each pass, the largest unsorted element is moved to its correct position.",
        "5. Repeat the process until the entire array is sorted.",
      ],
    },
    {
      title: "How Does This Program Operate?",
      content: [
        "1. The program generates a random array or allows custom user input.",
        "2. The bars on the screen represent the numbers in the array.",
        "3. The algorithm visually compares and swaps bars, with colors indicating progress:",
        "   - Red: Bars being compared.",
        "   - Blue: Default (unsorted) bars.",
        "   - Green: Sorted bars.",
        "4. Real-time comments explain each step of the algorithm.",
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

export default BubbleSortTutorial;
