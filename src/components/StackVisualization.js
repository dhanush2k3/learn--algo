import React, { useState } from "react";

const StackVisualization = () => {
  const [stack, setStack] = useState([]);

  const push = () => {
    const value = prompt("Enter value to push onto stack:");
    if (value) {
      setStack([...stack, value]);
    }
  };

  const pop = () => {
    const newStack = [...stack];
    newStack.pop();
    setStack(newStack);
  };

  return (
    <div>
      <h2>Stack Operations</h2>
      <button onClick={push}>Push</button>
      <button onClick={pop}>Pop</button>
      <ul>
        {stack.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default StackVisualization;
