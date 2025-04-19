export const dijkstra = (grid, startNode, endNode) => {
  const visitedNodesInOrder = [];
  const unvisitedNodes = [];

  // Initialize all nodes
  for (const row of grid) {
    for (const node of row) {
      node.distance = Infinity;
      node.previousNode = null;
      unvisitedNodes.push(node);
    }
  }
  startNode.distance = 0;

  while (unvisitedNodes.length > 0) {
    // Sort unvisited nodes by distance
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
    const currentNode = unvisitedNodes.shift();

    // Skip walls
    if (currentNode.isWall) continue;

    // Stop if no valid path exists
    if (currentNode.distance === Infinity) break;

    // Mark as visited
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    // If we reached the endNode, terminate early
    if (currentNode === endNode) break;

    // Update neighboring nodes
    updateUnvisitedNeighbors(currentNode, grid);
  }

  return visitedNodesInOrder;
};

const updateUnvisitedNeighbors = (node, grid) => {
  const neighbors = getNeighbors(node, grid);
  for (const neighbor of neighbors) {
    if (!neighbor.isVisited && !neighbor.isWall) {
      const newDistance = node.distance + 1;
      if (newDistance < neighbor.distance) {
        neighbor.distance = newDistance;
        neighbor.previousNode = node;
      }
    }
  }
};

const getNeighbors = (node, grid) => {
  const { row, col } = node;
  const neighbors = [];
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors;
};

export const getShortestPath = (endNode) => {
  const shortestPath = [];
  let currentNode = endNode;

  // If no path exists, return an empty array
  if (!endNode.previousNode) return shortestPath;

  while (currentNode !== null) {
    shortestPath.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return shortestPath;
};
