import useSimulationStore from '../store/simulationStore';
import TimeDisplay from './stats/TimeDisplay';
import PopulationChart from './stats/PopulationChart';
import GeneticsChart from './stats/GeneticsChart';

const Statistics = () => {
  const { showStats, stats } = useSimulationStore();
  
  if (!showStats) return null;
  
  return (
    <div className="fixed right-4 top-20 bg-white/90 rounded-lg shadow-lg p-4">
      <TimeDisplay />
      <div className="space-y-4">
        <PopulationChart data={stats?.population || []} />
        <GeneticsChart data={stats?.averageGenes || []} />
      </div>
    </div>
  );
};

export default Statistics;