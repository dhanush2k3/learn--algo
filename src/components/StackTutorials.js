import React, { useState } from "react";
import "./StackTutorials.css";

const StackTutorials = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "What is a Stack?",
      content: [
        "A stack is a linear data structure that follows the Last In, First Out (LIFO) principle.",
        "The last element pushed onto the stack is the first one to be popped.",
      ],
    },
    {
      title: "Core Operations",
      content: [
        "1. push(x): Adds element x to the top of the stack.",
        "2. pop(): Removes and returns the top element.",
        "3. peek(): Returns the top element without removing it.",
        "4. isEmpty(): Checks if the stack is empty.",
        "5. size(): Returns the number of elements in the stack.",
      ],
    },
    {
      title: "How Does a Stack Work?",
      content: [
        "1. All operations (push, pop, etc.) happen at the top of the stack.",
        "2. Stacks can be implemented using arrays or linked lists.",
        "3. It maintains one entry/exit point for all operations.",
      ],
    },
    {
      title: "Overflow and Underflow",
      content: [
        "Overflow: Occurs when pushing onto a full stack (fixed size).",
        "Underflow: Occurs when popping from an empty stack.",
      ],
    },
    {
      title: "Common Use Cases",
      content: [
        "1. Undo functionality in text editors.",
        "2. Syntax parsing (e.g., parentheses matching).",
        "3. Depth-first search (DFS) traversal in graphs.",
        "4. Reversing data.",
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

export default StackTutorials;
