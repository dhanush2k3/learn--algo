export const astarAlgorithm = (grid, startNode, endNode) => {
    const openSet = [startNode];
    const visitedNodesInOrder = [];
  
    startNode.gCost = 0;
    startNode.hCost = astarHeuristic(startNode, endNode);
    startNode.fCost = startNode.gCost + startNode.hCost;
  
    while (openSet.length > 0) {
      openSet.sort((a, b) => a.fCost - b.fCost);
      const currentNode = openSet.shift();
  
      if (currentNode === endNode) return visitedNodesInOrder;
  
      currentNode.isVisited = true;
      visitedNodesInOrder.push(currentNode);
  
      const neighbors = getNeighbors(currentNode, grid);
      for (const neighbor of neighbors) {
        if (neighbor.isVisited || neighbor.isWall) continue;
  
        const tentativeGCost = currentNode.gCost + 1;
  
        if (!openSet.includes(neighbor) || tentativeGCost < neighbor.gCost) {
          neighbor.gCost = tentativeGCost;
          neighbor.hCost = astarHeuristic(neighbor, endNode);
          neighbor.fCost = neighbor.gCost + neighbor.hCost;
          neighbor.previousNode = currentNode;
  
          if (!openSet.includes(neighbor)) openSet.push(neighbor);
        }
      }
    }
  
    return visitedNodesInOrder;
  };
  
  export const astarGetPath = (endNode) => {
    const path = [];
    let currentNode = endNode;
  
    while (currentNode !== null) {
      path.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
  
    return path;
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
  
  const astarHeuristic = (nodeA, nodeB) => {
    return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
  };
  