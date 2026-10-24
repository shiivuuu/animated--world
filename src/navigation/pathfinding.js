// Parul University - A* Pathfinding Engine
// Calculates shortest walkable routes, distance, walking time and turn-by-turn navigation steps

import { BUILDING_TO_NODE_MAP, NODES_BY_ID, ROUTE_EDGES, ROUTE_NODES } from './routeGraph.js';

// Build adjacency map
const ADJACENCY = {};
ROUTE_NODES.forEach((n) => {
  ADJACENCY[n.id] = [];
});

ROUTE_EDGES.forEach((edge) => {
  const n1 = NODES_BY_ID[edge.from];
  const n2 = NODES_BY_ID[edge.to];
  if (n1 && n2) {
    const dist = Math.hypot(n1.x - n2.x, n1.z - n2.z);
    ADJACENCY[edge.from].push({ to: edge.to, dist });
    ADJACENCY[edge.to].push({ to: edge.from, dist }); // bidirectional pedestrian pathways
  }
});

// Find closest graph node to any arbitrary 3D position
export function findClosestNode(x, z) {
  let closest = null;
  let minDist = Infinity;
  for (const node of ROUTE_NODES) {
    const d = Math.hypot(node.x - x, node.z - z);
    if (d < minDist) {
      minDist = d;
      closest = node;
    }
  }
  return closest;
}

// A* Search Algorithm
export function calculateRoute(startNodeId, targetNodeId) {
  if (!startNodeId || !targetNodeId) return null;
  if (startNodeId === targetNodeId) {
    const node = NODES_BY_ID[startNodeId];
    return {
      nodes: [node],
      points3D: [[node.x, 0.4, node.z]],
      distanceMeters: 0,
      walkingMinutes: 0,
      directions: [`You are already at ${node.label}.`]
    };
  }

  const openSet = new Set([startNodeId]);
  const cameFrom = {};
  const gScore = {};
  const fScore = {};

  ROUTE_NODES.forEach((n) => {
    gScore[n.id] = Infinity;
    fScore[n.id] = Infinity;
  });

  gScore[startNodeId] = 0;
  const targetNode = NODES_BY_ID[targetNodeId];
  if (!targetNode) return null;

  fScore[startNodeId] = Math.hypot(
    NODES_BY_ID[startNodeId].x - targetNode.x,
    NODES_BY_ID[startNodeId].z - targetNode.z
  );

  while (openSet.size > 0) {
    // Get node in openSet with lowest fScore
    let current = null;
    let lowestF = Infinity;
    for (const nodeId of openSet) {
      if (fScore[nodeId] < lowestF) {
        lowestF = fScore[nodeId];
        current = nodeId;
      }
    }

    if (current === targetNodeId) {
      // Reconstruct path
      const pathNodes = [];
      let temp = current;
      while (temp) {
        pathNodes.unshift(NODES_BY_ID[temp]);
        temp = cameFrom[temp];
      }

      // Convert to 3D coordinate points with subtle vertical offset above ground
      const points3D = pathNodes.map((n) => [n.x, 0.4, n.z]);
      const distanceMeters = Math.round(gScore[targetNodeId]);
      // Average walking speed: 4.5 km/h ~ 75 meters/min
      const walkingMinutes = Math.max(1, Math.round(distanceMeters / 75));

      // Generate turn-by-turn directions
      const directions = [];
      directions.push(`Start walking from ${pathNodes[0].label}`);
      for (let i = 1; i < pathNodes.length - 1; i++) {
        directions.push(`Proceed along path past ${pathNodes[i].label}`);
      }
      directions.push(`Arrive at destination: ${pathNodes[pathNodes.length - 1].label}`);

      return {
        nodes: pathNodes,
        points3D,
        distanceMeters,
        walkingMinutes,
        directions
      };
    }

    openSet.delete(current);
    const neighbors = ADJACENCY[current] || [];

    for (const neighbor of neighbors) {
      const tentativeG = gScore[current] + neighbor.dist;
      if (tentativeG < gScore[neighbor.to]) {
        cameFrom[neighbor.to] = current;
        gScore[neighbor.to] = tentativeG;
        const neighborNode = NODES_BY_ID[neighbor.to];
        fScore[neighbor.to] = tentativeG + Math.hypot(neighborNode.x - targetNode.x, neighborNode.z - targetNode.z);
        openSet.add(neighbor.to);
      }
    }
  }

  return null; // No route found
}

// High-level path solver between buildings or coordinates
export function routeBetweenBuildings(sourceBuildingId, destBuildingId) {
  const startNodeId = BUILDING_TO_NODE_MAP[sourceBuildingId] || "node-gate1";
  const targetNodeId = BUILDING_TO_NODE_MAP[destBuildingId];
  if (!targetNodeId) return null;
  return calculateRoute(startNodeId, targetNodeId);
}
