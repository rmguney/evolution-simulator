import { calculateEnergyConsumption, calculateMovementSpeed, generateOffspringGenes } from './geneticUtils';
import { createCritter } from './critterUtils';

const REPRODUCTION_THRESHOLD = 80;
const EATING_DISTANCE = 1.5;
const REPRODUCTION_DISTANCE = 2;

export const updatePlant = (plant, dt, nearWater) => {
  if (plant.depleted) return plant;
  return {
    ...plant,
    growth: Math.min(1, plant.growth + dt * (nearWater ? 2 : 1))
  };
};

export const updateCritter = (critter, dt, plants, critters) => {
  const energyConsumption = calculateEnergyConsumption(1, critter.genes.size) * dt;
  let newEnergy = Math.max(0, critter.stats.energy - energyConsumption);
  
  const nearestPlant = plants.find(plant => {
    if (plant.depleted) return false;
    const dx = plant.position[0] - critter.position[0];
    const dz = plant.position[2] - critter.position[2];
    const distance = Math.sqrt(dx * dx + dz * dz);
    return distance < EATING_DISTANCE;
  });

  if (nearestPlant) {
    newEnergy = Math.min(100, newEnergy + 30);
    nearestPlant.depleted = true;
  }

  if (newEnergy > REPRODUCTION_THRESHOLD) {
    const mate = critters.find(other => {
      if (other.id === critter.id || other.stats.energy < REPRODUCTION_THRESHOLD) return false;
      const dx = other.position[0] - critter.position[0];
      const dz = other.position[2] - critter.position[2];
      const distance = Math.sqrt(dx * dx + dz * dz);
      return distance < REPRODUCTION_DISTANCE;
    });

    if (mate) {
      const offspringGenes = generateOffspringGenes(critter.genes, mate.genes);
      const offspringPosition = [...critter.position];
      offspringPosition[0] += (Math.random() - 0.5) * 2;
      offspringPosition[2] += (Math.random() - 0.5) * 2;
      
      const offspring = createCritter(offspringPosition, offspringGenes);
      newEnergy -= 30;
      return { updatedCritter: { ...critter, stats: { ...critter.stats, energy: newEnergy } }, offspring };
    }
  }

  const newAge = critter.stats.age + dt;
  return {
    updatedCritter: {
      ...critter,
      stats: {
        ...critter.stats,
        energy: newEnergy,
        age: newAge,
        alive: newEnergy > 0 && newAge < critter.genes.lifespan
      }
    }
  };
};