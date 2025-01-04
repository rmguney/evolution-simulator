// Utility functions for hexagonal grid calculations
export const SQRT3 = Math.sqrt(3);

// Convert cube coordinates to world position
export const cubeToWorld = (q, r, size) => {
  const x = size * (3/2 * q);
  const z = size * (SQRT3/2 * q + SQRT3 * r);
  return [x, 0, z];
};

// Get all neighboring hex coordinates
export const getNeighbors = (q, r) => {
  const directions = [
    [1, 0], [1, -1], [0, -1],
    [-1, 0], [-1, 1], [0, 1]
  ];
  
  return directions.map(([dq, dr]) => ({
    q: q + dq,
    r: r + dr
  }));
};

// Calculate distance between two hex coordinates
export const hexDistance = (q1, r1, q2, r2) => {
  const s1 = -q1 - r1;
  const s2 = -q2 - r2;
  return Math.max(
    Math.abs(q1 - q2),
    Math.abs(r1 - r2),
    Math.abs(s1 - s2)
  );
};