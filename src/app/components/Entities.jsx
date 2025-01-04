import Plant from './Plant';
import Critter from './Critter';
import useSimulationStore from '../store/simulationStore';

const Entities = () => {
  const { plants, critters } = useSimulationStore();
  
  return (
    <group>
      {plants.map((plant) => (
        <Plant
          key={plant.id}
          position={plant.position}
          scale={plant.scale}
        />
      ))}
      {critters.map((critter) => (
        <Critter
          key={critter.id}
          position={critter.position}
          genes={critter.genes}
          stats={critter.stats}
        />
      ))}
    </group>
  );
};

export default Entities;