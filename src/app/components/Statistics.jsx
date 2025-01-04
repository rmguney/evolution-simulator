import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import useSimulationStore from '../store/simulationStore';
import TimeDisplay from './stats/TimeDisplay';
import PopulationChart from './stats/PopulationChart';
import GeneticsChart from './stats/GeneticsChart';

const Statistics = () => {
  const { stats } = useSimulationStore();
  
  return (
    <div className="fixed right-4 top-20 bg-white/90 rounded-lg shadow-lg p-4">
      <TimeDisplay />
      <div className="space-y-4">
        <PopulationChart data={stats.population} />
        <GeneticsChart data={stats.averageGenes} />
      </div>
    </div>
  );
};

export default Statistics;