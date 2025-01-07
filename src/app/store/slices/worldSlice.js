import { generateGrid } from '../../utils/worldUtils';
import { createCritter } from '../../utils/critterUtils';
import { createPlant } from '../../utils/plantUtils';

export const createWorldSlice = (set, get) => {
  // Helper function defined within the slice
  const spawnInitialEntities = () => {
    const { grid, initialCritters, initialPlants } = get();
    const landTiles = grid.filter(tile => tile.type === 'land');
    
    if (landTiles.length === 0) return;
    
    // Spawn plants
    const plants = Array(initialPlants).fill(null).map(() => {
      const tile = landTiles[Math.floor(Math.random() * landTiles.length)];
      return createPlant([...tile.position]); // Create a new array to avoid reference issues
    });
    
    // Spawn critters
    const critters = Array(initialCritters).fill(null).map(() => {
      const tile = landTiles[Math.floor(Math.random() * landTiles.length)];
      return createCritter([...tile.position]); // Create a new array to avoid reference issues
    });
    
    set({ plants, critters });
  };

  return {
    // World configuration
    worldSize: 10,
    waterPercentage: 0.2,
    initialCritters: 10,
    initialPlants: 20,
    
    // Entities
    grid: [],
    plants: [],
    critters: [],
    
    initializeWorld: () => {
      const { worldSize, waterPercentage } = get();
      const grid = generateGrid(worldSize, waterPercentage);
      set({ grid, plants: [], critters: [] });
      spawnInitialEntities();
    },
    
    setWorldConfig: (config) => {
      set({
        worldSize: config.worldSize || get().worldSize,
        waterPercentage: config.waterPercentage,
        initialCritters: config.initialCritters,
        initialPlants: config.initialPlants,
      });
      get().initializeWorld();
    },
  };
};