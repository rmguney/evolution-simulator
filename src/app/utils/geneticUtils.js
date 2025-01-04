// Utility functions for genetic calculations and mutations

// Calculate energy consumption based on size
export const calculateEnergyConsumption = (baseConsumption, size) => {
  return baseConsumption * (1 + (size / 100));
};

// Calculate max energy based on size
export const calculateMaxEnergy = (baseEnergy, size) => {
  return baseEnergy + (size * 2);
};

// Calculate movement speed with size penalty
export const calculateMovementSpeed = (baseSpeed, size, agilityOffset = 0, minSpeed = 0.1) => {
  return Math.max(baseSpeed * (1 - (size / 200)) + agilityOffset, minSpeed);
};

// Calculate fertility threshold
export const calculateFertilityThreshold = (baseFertility, fertility, age) => {
  return baseFertility - (fertility / 100) * age;
};

// Calculate reproduction energy cost
export const calculateReproductionCost = (fertility) => {
  return 40 - (fertility / 100) * 10;
};

// Calculate mutation amount for offspring
export const calculateMutation = (baseMutation, size, movementSpeed, maxMutation = 0.2) => {
  return Math.min(baseMutation * (1 + (size / 100) + (movementSpeed / 100)), maxMutation);
};

// Generate offspring genes from parents
export const generateOffspringGenes = (parent1, parent2) => {
  const mutationRate = calculateMutation(0.1, parent1.size, parent1.movementSpeed);
  
  const mixGene = (gene1, gene2) => {
    const avg = (gene1 + gene2) / 2;
    const mutation = (Math.random() - 0.5) * 2 * mutationRate * avg;
    return Math.max(0, avg + mutation);
  };
  
  return {
    size: mixGene(parent1.size, parent2.size),
    movementSpeed: mixGene(parent1.movementSpeed, parent2.movementSpeed),
    fertility: mixGene(parent1.fertility, parent2.fertility),
    lifespan: mixGene(parent1.lifespan, parent2.lifespan)
  };
};