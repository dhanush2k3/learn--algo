import { useEffect, useRef } from "react"; // Removed 'React' as it's unused

const Dijkstra = ({ graph, startNode, endNode, isPaused }) => {
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const dijkstra = async (graph, startNode, endNode) => {
      const nodes = Array.from(graph.keys());
      const distances = {};
      const previous = {};
      const pq = new PriorityQueue();

      nodes.forEach((node) => {
        distances[node] = Infinity;
        previous[node] = null;
      });

      distances[startNode] = 0;
      pq.enqueue(startNode, 0);

      while (!pq.isEmpty()) {
        const { element: currentNode } = pq.dequeue();

        if (isPausedRef.current) {
          await new Promise((resolve) => {
            const interval = setInterval(() => {
              if (!isPausedRef.current) {
                clearInterval(interval);
                resolve();
              }
            }, 100);
          });
        }

        if (currentNode === endNode) break;

        const neighbors = graph.get(currentNode);
        for (const [neighbor, weight] of neighbors) {
          const alt = distances[currentNode] + weight;

          if (alt < distances[neighbor]) {
            distances[neighbor] = alt;
            previous[neighbor] = currentNode;
            pq.enqueue(neighbor, alt);
          }
        }
      }

      const path = [];
      let currentNode = endNode;

      while (currentNode) {
        path.unshift(currentNode);
        currentNode = previous[currentNode];
      }

      console.log(path); // For debugging

      return path;
    };

    dijkstra(graph, startNode, endNode);
  }, [graph, startNode, endNode]);

  return null;
};

class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(element, priority) {
    const queueElement = { element, priority };
    let added = false;

    for (let i = 0; i < this.items.length; i++) {
      if (queueElement.priority < this.items[i].priority) {
        this.items.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }

    if (!added) {
      this.items.push(queueElement);
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

export default Dijkstra;
