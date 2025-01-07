import { updateCritter, updatePlant } from '../../utils/simulationUtils';

export const createSimulationSlice = (set, get) => ({
  isRunning: false,
  speed: 1,
  elapsedTime: 0,
  realTime: 0,
  
  setRunning: (isRunning) => set({ isRunning }),
  setSpeed: (speed) => set({ speed }),
  
  updateTime: (dt) => {
    const { speed, plants, critters, grid, updateStats } = get();
    const simulationDt = dt * speed;
    
    // Update all entities
    const newCritters = [];
    const updatedCritters = critters.map(critter => {
      const result = updateCritter(critter, simulationDt, plants, critters);
      if (result.offspring) {
        newCritters.push(result.offspring);
      }
      return result.updatedCritter;
    }).filter(critter => critter.stats.alive);

    // Add any new offspring
    updatedCritters.push(...newCritters);
    
    const updatedPlants = plants.filter(plant => !plant.depleted);
    
    // Spawn new plants periodically
    if (Math.random() < 0.05 * simulationDt) {
      const landTiles = grid.filter(tile => tile.type === 'land');
      if (landTiles.length > 0) {
        const tile = landTiles[Math.floor(Math.random() * landTiles.length)];
        updatedPlants.push({
          id: Math.random().toString(),
          position: [...tile.position],
          depleted: false
        });
      }
    }
    
    set(state => ({
      elapsedTime: state.elapsedTime + simulationDt,
      realTime: state.realTime + dt,
      critters: updatedCritters,
      plants: updatedPlants
    }));
    
    // Update statistics
    updateStats();
  },
  
  reset: () => {
    set({
      isRunning: false,
      elapsedTime: 0,
      realTime: 0,
    });
    get().initializeWorld();
  },
});