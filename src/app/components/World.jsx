import { useEffect } from 'react';
import HexGrid from './HexGrid';
import Entities from './Entities';
import useSimulationStore from '../store/simulationStore';

const World = () => {
  const { initializeWorld } = useSimulationStore();
  
  useEffect(() => {
    initializeWorld();
  }, []);

  return (
    <>
      <HexGrid />
      <Entities />
    </>
  );
};

export default World;