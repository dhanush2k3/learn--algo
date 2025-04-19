import React, { useState } from 'react';
import './Chatbot.css';
import { ReactComponent as BotIcon } from './bot-icon.svg';

const ruleBasedResponses = {
    // Sorting Algorithms
    "what is bubble sort": "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. It's best for small datasets and has a time complexity of O(n^2).",
    "how does bubble sort work": "Bubble Sort works by repeatedly comparing and swapping adjacent elements if they are out of order. Each pass moves the largest unsorted element to its correct position at the end. This process repeats until the list is sorted.",
    "when to use bubble sort": "Bubble Sort is mainly used for educational purposes or on very small datasets due to its simplicity, but it's not efficient for large data.",
  
    "is bubble sort better than quick sort": "No, Bubble Sort is generally slower than Quick Sort. Bubble Sort has a time complexity of O(n^2), while Quick Sort averages O(n log n).",
  
    "what is selection sort": "Selection Sort repeatedly selects the minimum element from the unsorted part and places it at the beginning. Time complexity is O(n^2) and it performs well on small lists.",
    "how does selection sort work": "Selection Sort finds the minimum element from the unsorted part and swaps it with the first unsorted element. It keeps expanding the sorted part from the beginning.",
  
    "what is insertion sort": "Insertion Sort builds the final sorted array one element at a time. It’s efficient for small datasets and mostly sorted arrays, with an average time complexity of O(n^2).",
    "how does insertion sort work": "Insertion Sort works by picking one element at a time and inserting it into the correct position in the already sorted portion of the array.",
  
    "what is merge sort": "Merge Sort is a divide and conquer algorithm that splits the array into halves, recursively sorts them, and then merges them. It has a consistent time complexity of O(n log n).",
    "how does merge sort work": "Merge Sort divides the array into halves until single-element arrays remain, then merges these arrays while sorting them until the full array is rebuilt in sorted order.",
  
    "what is quick sort": "Quick Sort selects a pivot, partitions the array around it, and recursively sorts sub-arrays. Average time complexity is O(n log n), but worst case is O(n^2).",
    "how does quick sort work": "Quick Sort works by picking a pivot, then placing smaller elements before it and larger elements after it. It then recursively applies the same logic to the sub-arrays.",
  
    "what is heap sort": "Heap Sort converts the array into a heap structure and repeatedly extracts the max element. It has O(n log n) time complexity but is not stable.",
    "how does heap sort work": "Heap Sort builds a max-heap from the input data. It then repeatedly swaps the first element (largest) with the last, shrinks the heap, and heapifies the root.",
  
    // Searching Algorithms
    "what is linear search": "Linear Search checks every element until it finds the target. It's simple but inefficient for large datasets with O(n) time complexity.",
    "how does linear search work": "Linear Search starts at the beginning of the list and checks each element one by one until it finds the target or reaches the end.",
  
    "what is binary search": "Binary Search works on sorted arrays. It repeatedly divides the range in half, resulting in O(log n) time complexity.",
    "how does binary search work": "Binary Search finds the middle of the list and checks if the target is less than or greater than the middle. It repeats this on the appropriate half until the target is found.",
  
    "binary vs linear search": "Binary Search is faster but only works on sorted arrays. Linear Search works on unsorted arrays but is slower (O(n)).",
  
    // Graph Algorithms
    "what is bfs": "BFS (Breadth-First Search) explores the graph level by level, using a queue. It's useful for finding shortest paths in unweighted graphs.",
    "how does bfs work": "BFS starts at a source node and explores all neighbors before moving to the next level, using a queue to track nodes.",
  
    "what is dfs": "DFS (Depth-First Search) explores as deep as possible using a stack or recursion before backtracking. It's useful for pathfinding and component discovery.",
    "how does dfs work": "DFS starts at a source node and explores as deep as possible before backtracking, typically implemented using recursion or a stack.",
  
    "bfs vs dfs": "BFS uses a queue and explores level by level. DFS uses a stack/recursion and goes deep before backtracking. BFS is better for shortest path in unweighted graphs.",
  
    // Pathfinding Algorithms
    "what is dijkstra algorithm": "Dijkstra's algorithm finds the shortest path from a source to all vertices in a weighted graph with non-negative edges.",
    "how does dijkstra algorithm work": "Dijkstra keeps track of the shortest known distance to each node and updates neighbors using a priority queue until the shortest paths are found.",
  
    "what is a star algorithm": "A* is a pathfinding algorithm that combines the cost to reach a node and an estimated cost to the goal. It's optimal and complete if the heuristic is admissible.",
    "how is dijkstra different from a star": "Dijkstra doesn't use heuristics and finds shortest path to all nodes. A* uses heuristics and focuses on goal-directed pathfinding, often faster for a single target.",
  
    // Dynamic Programming
    "what is dynamic programming": "Dynamic Programming (DP) solves complex problems by breaking them down into simpler overlapping subproblems. It stores results to avoid redundant computations.",
    "how does dynamic programming work": "DP solves subproblems once and stores the results. It can be implemented using memoization (top-down) or tabulation (bottom-up).",
  
    "difference between dp and recursion": "DP uses memoization or tabulation to store results of subproblems, reducing time complexity. Recursion without DP may recompute the same subproblems multiple times.",
    "what is memoization": "Memoization is a top-down technique of storing function results during recursion to avoid redundant calls, improving efficiency.",
    "what is tabulation": "Tabulation is a bottom-up DP technique where results are computed iteratively and stored in a table.",
  
    // Greedy, Backtracking
    "what is greedy algorithm": "Greedy algorithms build up a solution step-by-step by choosing the locally optimal option. It's efficient but may not give globally optimal results.",
    "how does greedy algorithm work": "At each step, greedy algorithms choose the best option without considering the full problem, assuming local optimum will lead to global optimum.",
  
    "what is backtracking": "Backtracking is a method for solving problems recursively by trying partial solutions and then abandoning them if they do not lead to a valid solution.",
    "how does backtracking work": "Backtracking explores all possibilities for a solution by building solutions incrementally and removing solutions that fail to satisfy constraints.",
  
    "difference between greedy and dp": "Greedy makes decisions based on current best, while DP considers all possibilities and stores optimal sub-results. DP is more reliable for optimal solutions.",
  
    // Complexity
    "what is time complexity": "Time complexity estimates the time an algorithm takes to run, based on input size. Common notations: O(1), O(n), O(n log n), O(n^2), etc.",
    "what is space complexity": "Space complexity is the amount of memory used by an algorithm as a function of input size. It includes input, temporary, and auxiliary space.",
    "why is time complexity important": "It helps in comparing efficiency of algorithms and determining their scalability with increasing input size.",
  
    // Fallback
    "default": "I'm sorry, I don't have an answer for that question. Please try asking about a known algorithm like 'What is Merge Sort?' or 'Binary vs Linear Search'."
  };

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: '👋 Welcome! I’m your Algorithm Assistant. Ask me anything like "What is Bubble Sort?", "How does BFS work?", or request an example.' }
  ]);
  const [input, setInput] = useState('');
  const [showChat, setShowChat] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { from: 'user', text: input };
    const botResponse = getBotResponse(input);
    setMessages(prev => [...prev, userMessage, { from: 'bot', text: botResponse }]);
    setInput('');
  };

  const getBotResponse = (inputText) => {
    const cleanedInput = inputText.toLowerCase().trim();

    if (ruleBasedResponses[cleanedInput]) {
      return ruleBasedResponses[cleanedInput];
    }

    for (const key in ruleBasedResponses) {
      if (cleanedInput.includes(key)) {
        return ruleBasedResponses[key];
      }
    }

    return ruleBasedResponses["default"];
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div>
      <button className="chat-toggle-button" onClick={() => setShowChat(!showChat)}>
        {showChat ? 'Hide Chatbot' : 'Show Chatbot'}
      </button>

      {showChat && (
        <div className="chatbot-container">
          <div className="chat-window">
            {messages.map((msg, index) => (
              <div key={index} className={`message-row ${msg.from}`}>
                <div className={`message-bubble ${msg.from}`}>
                  {msg.from === 'bot' && <BotIcon className="bot-icon" />} {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="input-area">
            <input
              type="text"
              className="input-box"
              placeholder="Ask about an algorithm..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="send-button" onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
