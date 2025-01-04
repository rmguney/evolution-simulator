import { create } from 'zustand';
import { generateGrid } from '../utils/worldUtils';

const useSimulationStore = create((set, get) => ({
  // Simulation state
  running: false,
  speed: 1,
  elapsedTime: 0,
  realTime: 0,
  
  // World configuration
  worldSize: 20,
  waterPercentage: 0.2,
  initialCritters: 10,
  initialPlants: 20,
  
  // Entity collections
  grid: [],
  critters: [],
  plants: [],
  
  // Statistics
  stats: {
    population: [],
    averageGenes: {
      size: [],
      speed: [],
      fertility: [],
      lifespan: []
    }
  },
  
  // Initialize world
  initializeWorld: () => {
    const { worldSize, waterPercentage } = get();
    const grid = generateGrid(worldSize, waterPercentage);
    set({ grid });
  },
  
  // Actions
  setRunning: (running) => set({ running }),
  setSpeed: (speed) => set({ speed }),
  updateTime: (dt) => set((state) => ({
    elapsedTime: state.elapsedTime + dt * state.speed,
    realTime: state.realTime + dt
  })),
  
  resetSimulation: () => {
    const { worldSize, waterPercentage } = get();
    set({
      running: false,
      elapsedTime: 0,
      realTime: 0,
      grid: generateGrid(worldSize, waterPercentage),
      critters: [],
      plants: [],
      stats: {
        population: [],
        averageGenes: {
          size: [],
          speed: [],
          fertility: [],
          lifespan: []
        }
      }
    });
  },
  
  updateConfiguration: (config) => set((state) => ({
    worldSize: config.worldSize ?? state.worldSize,
    waterPercentage: config.waterPercentage ?? state.waterPercentage,
    initialCritters: config.initialCritters ?? state.initialCritters,
    initialPlants: config.initialPlants ?? state.initialPlants
  }))
}));

export default useSimulationStore;