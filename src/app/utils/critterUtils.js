import { v4 as uuidv4 } from 'uuid';

export const createCritter = (position) => ({
  id: uuidv4(),
  position,
  genes: {
    size: 50 + Math.random() * 50,
    movementSpeed: 50 + Math.random() * 50,
    fertility: 50 + Math.random() * 50,
    lifespan: 50 + Math.random() * 50,
  },
  stats: {
    age: 0,
    energy: 100,
    alive: true,
  },
});