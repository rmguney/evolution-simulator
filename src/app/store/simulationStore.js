import { create } from 'zustand';
import { createWorldSlice } from './slices/worldSlice';
import { createSimulationSlice } from './slices/simulationSlice';
import { createStatsSlice } from './slices/statsSlice';

const useSimulationStore = create((set, get) => ({
  ...createWorldSlice(set, get),
  ...createSimulationSlice(set, get),
  ...createStatsSlice(set, get),
}));

export default useSimulationStore;