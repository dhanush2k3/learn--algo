import React, { useState } from "react";
import "./LinkedListTutorials.css";

const LinkedListTutorials = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "What is a Linked List?",
      content: [
        "A Linked List is a data structure consisting of nodes.",
        "Each node has two parts: data (value) and a reference (next) to the next node.",
        "Nodes are connected using these references to form a sequence.",
      ],
    },
    {
      title: "Why Use a Linked List?",
      content: [
        "Linked Lists are dynamic, meaning they can grow or shrink without reallocating memory.",
        "Efficient for frequent insertions and deletions, especially compared to arrays.",
        "Used in scenarios like stacks, queues, and graph representations.",
      ],
    },
    {
      title: "Types of Linked Lists",
      content: [
        "1. Singly Linked List: Each node points to the next node.",
        "2. Doubly Linked List: Each node has two references: to the next and previous nodes.",
        "3. Circular Linked List: The last node points back to the first, forming a circle.",
      ],
    },
    {
      title: "How Does a Linked List Work?",
      content: [
        "1. The list starts from the head node.",
        "2. Each node contains a pointer to the next node in the sequence.",
        "3. Traversal happens by following the pointers until reaching a null reference.",
        "4. Insertions and deletions adjust these pointers to maintain the linked structure.",
      ],
    },
    {
      title: "Insertion in a Linked List",
      content: [
        "1. At the Beginning: Set the new node’s next to the current head and update the head.",
        "2. At the End: Traverse to the last node and set its next to the new node.",
        "3. At a Specific Position: Traverse to the (position-1)th node, adjust pointers, and insert the new node.",
      ],
    },
    {
      title: "Deletion in a Linked List",
      content: [
        "1. At the Beginning: Update the head to head.next.",
        "2. At the End: Traverse to the second-to-last node and set its next to null.",
        "3. At a Specific Position: Adjust pointers to skip over the node being deleted.",
      ],
    },
    {
      title: "Advantages of Linked Lists",
      content: [
        "1. Dynamic size with no memory waste.",
        "2. Efficient insertions and deletions, especially in the middle of the list.",
        "3. Suitable for implementing stacks, queues, and graphs.",
      ],
    },
    {
      title: "Limitations of Linked Lists",
      content: [
        "1. Slower access times compared to arrays (O(n) for traversal).",
        "2. Requires more memory due to storing pointers.",
        "3. Difficult to reverse or sort compared to simpler structures like arrays.",
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

export default LinkedListTutorials;
