import { v4 as uuidv4 } from 'uuid';

export const createPlant = (position) => ({
  id: uuidv4(),
  position,
  growth: 0,
  energy: 100,
  depleted: false,
});