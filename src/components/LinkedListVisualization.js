import React, { useState } from "react";

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

const LinkedListVisualization = () => {
  const [head, setHead] = useState(null); // Reference to the head of the list
  const [inputValue, setInputValue] = useState(""); // Input value for new nodes
  const [nodes, setNodes] = useState([]); // Array representation of the linked list for display

  // Insert a node at the beginning
  const insertAtBeginning = () => {
    const newNode = new Node(inputValue);
    newNode.next = head;
    setHead(newNode);
    setInputValue("");
    updateNodes();
  };

  // Insert a node at the end
  const insertAtEnd = () => {
    const newNode = new Node(inputValue);
    if (!head) {
      setHead(newNode);
    } else {
      let current = head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    setInputValue("");
    updateNodes();
  };

  // Delete a node from the beginning
  const deleteFromBeginning = () => {
    if (!head) return;
    setHead(head.next);
    updateNodes();
  };

  // Delete a node from the end
  const deleteFromEnd = () => {
    if (!head) return;

    if (!head.next) {
      setHead(null);
    } else {
      let current = head;
      while (current.next && current.next.next) {
        current = current.next;
      }
      current.next = null;
    }
    updateNodes();
  };

  // Update the array representation of the linked list
  const updateNodes = () => {
    const newNodes = [];
    let current = head;
    while (current) {
      newNodes.push(current.data);
      current = current.next;
    }
    setNodes(newNodes);
  };

  return (
    <div>
      <h2>Singly Linked List Operations</h2>
      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value"
          className="input-field"
        />
        <button onClick={insertAtBeginning} className="action-button">
          Insert at Beginning
        </button>
        <button onClick={insertAtEnd} className="action-button">
          Insert at End
        </button>
        <button onClick={deleteFromBeginning} className="action-button">
          Delete from Beginning
        </button>
        <button onClick={deleteFromEnd} className="action-button">
          Delete from End
        </button>
      </div>
      <div className="output-section">
        <h3>Linked List:</h3>
        <ul>
          {nodes.map((node, index) => (
            <li key={index}>{node}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LinkedListVisualization;
