import { useRef } from 'react';
import HexTile from './HexTile';
import useSimulationStore from '../store/simulationStore';

const HexGrid = () => {
  const { grid } = useSimulationStore();
  
  return (
    <group>
      {grid.map((tile) => (
        <HexTile
          key={`${tile.q}-${tile.r}`}
          position={tile.position}
          type={tile.type}
        />
      ))}
    </group>
  );
};

export default HexGrid;