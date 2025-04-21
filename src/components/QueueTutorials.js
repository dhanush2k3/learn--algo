import React, { useState } from "react";
import "./QueueTutorials.css";

const QueueTutorials = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "What is a Queue?",
      content: [
        "A queue is a linear data structure that follows the First In, First Out (FIFO) principle.",
        "The first element added is the first one to be removed.",
      ],
    },
    {
      title: "Core Operations",
      content: [
        "1. enqueue(x): Add element x at the rear of the queue.",
        "2. dequeue(): Remove and return the front element.",
        "3. peek(): View the front element without removing it.",
        "4. isEmpty(): Check if the queue is empty.",
        "5. size(): Return the number of elements in the queue.",
      ],
    },
    {
      title: "How Does a Queue Work?",
      content: [
        "1. Two main pointers: front and rear.",
        "2. Front points to the element to be dequeued next.",
        "3. Rear points to the position where the next element will be enqueued.",
      ],
    },
    {
      title: "Common Use Cases",
      content: [
        "1. CPU task scheduling.",
        "2. Breadth-first search (BFS) traversal in graphs.",
        "3. Resource sharing in operating systems.",
        "4. Print spooling.",
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

export default QueueTutorials;
