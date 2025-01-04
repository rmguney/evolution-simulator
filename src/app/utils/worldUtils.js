import { cubeToWorld } from './hexUtils';

export const generateGrid = (size, waterPercentage) => {
  const grid = [];
  const waterTiles = Math.floor(size * size * waterPercentage);
  const totalTiles = size * size;
  
  // Create all land tiles first
  for (let q = 0; q < size; q++) {
    for (let r = 0; r < size; r++) {
      const position = cubeToWorld(q, r, 1);
      grid.push({
        q,
        r,
        position,
        type: 'land'
      });
    }
  }
  
  // Randomly convert some to water
  let waterCount = 0;
  while (waterCount < waterTiles) {
    const index = Math.floor(Math.random() * totalTiles);
    if (grid[index].type === 'land') {
      grid[index].type = 'water';
      waterCount++;
    }
  }
  
  return grid;
};