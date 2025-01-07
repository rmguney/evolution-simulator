import { useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import HexGrid from './HexGrid';
import Entities from './Entities';
import useSimulationStore from '../store/simulationStore';

const World = () => {
  const { initializeWorld, isRunning, updateTime } = useSimulationStore();
  
  useEffect(() => {
    initializeWorld();
  }, []);

  useFrame((state, delta) => {
    if (isRunning) {
      updateTime(delta);
    }
  });

  return (
    <>
      <HexGrid />
      <Entities />
    </>
  );
};

export default World;