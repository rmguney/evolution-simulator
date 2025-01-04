import { useState } from 'react';
import { Play, Pause, RotateCcw, Settings, BarChart } from 'lucide-react';
import SpeedControls from './controls/SpeedControls';
import useSimulationStore from '../store/simulationStore';

const ControlPanel = () => {
  const { running, setRunning, resetSimulation } = useSimulationStore();
  const [showSettings, setShowSettings] = useState(false);
  const [showStats, setShowStats] = useState(false);
  
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-white/90 rounded-lg shadow-lg p-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setRunning(!running)}
          className="p-2 rounded hover:bg-gray-100"
          aria-label={running ? 'Pause' : 'Play'}
        >
          {running ? <Pause size={24} /> : <Play size={24} />}
        </button>
        
        <button
          onClick={resetSimulation}
          className="p-2 rounded hover:bg-gray-100"
          aria-label="Reset"
        >
          <RotateCcw size={24} />
        </button>
        
        <SpeedControls />
        
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded hover:bg-gray-100"
          aria-label="Settings"
        >
          <Settings size={24} />
        </button>
        
        <button
          onClick={() => setShowStats(!showStats)}
          className="p-2 rounded hover:bg-gray-100"
          aria-label="Statistics"
        >
          <BarChart size={24} />
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;