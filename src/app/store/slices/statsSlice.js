export const createStatsSlice = (set, get) => ({
  stats: {
    population: [],
    averageGenes: {
      size: [],
      speed: [],
      fertility: [],
      lifespan: []
    }
  },
  
  showStats: false,
  
  toggleStats: () => set(state => ({ showStats: !state.showStats })),
  
  updateStats: () => {
    const { critters } = get();
    const time = get().elapsedTime;
    
    // Update population stats
    const populationData = {
      time,
      count: critters.length
    };
    
    // Calculate average genes
    const averageGenes = critters.reduce((acc, critter) => ({
      size: acc.size + critter.genes.size,
      speed: acc.speed + critter.genes.movementSpeed,
      fertility: acc.fertility + critter.genes.fertility,
      lifespan: acc.lifespan + critter.genes.lifespan
    }), { size: 0, speed: 0, fertility: 0, lifespan: 0 });
    
    const count = critters.length || 1;
    Object.keys(averageGenes).forEach(key => {
      averageGenes[key] /= count;
    });
    
    set(state => ({
      stats: {
        population: [...state.stats.population, populationData],
        averageGenes: {
          size: [...state.stats.averageGenes.size, { time, value: averageGenes.size }],
          speed: [...state.stats.averageGenes.speed, { time, value: averageGenes.speed }],
          fertility: [...state.stats.averageGenes.fertility, { time, value: averageGenes.fertility }],
          lifespan: [...state.stats.averageGenes.lifespan, { time, value: averageGenes.lifespan }]
        }
      }
    }));
  }
});