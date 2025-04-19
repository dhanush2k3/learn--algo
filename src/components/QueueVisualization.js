import React, { useState } from "react";

const QueueVisualization = () => {
  const [queue, setQueue] = useState([]);

  const enqueue = () => {
    const value = prompt("Enter value to enqueue:");
    if (value) {
      setQueue([...queue, value]);
    }
  };

  const dequeue = () => {
    if (queue.length > 0) {
      const newQueue = [...queue];
      newQueue.shift(); // Removes the first element
      setQueue(newQueue);
    }
  };

  return (
    <div>
      <h2>Queue Operations</h2>
      <button onClick={enqueue} className="action-button">Enqueue</button>
      <button onClick={dequeue} className="action-button">Dequeue</button>
      <ul>
        {queue.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default QueueVisualization;
