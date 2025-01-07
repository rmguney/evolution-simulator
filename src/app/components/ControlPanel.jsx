import { useState } from 'react';
import { Play, Pause, RotateCcw, Settings, BarChart } from 'lucide-react';
import SpeedControls from './controls/SpeedControls';
import SettingsPanel from './controls/SettingsPanel';
import useSimulationStore from '../store/simulationStore';

const ControlPanel = () => {
  const { isRunning, setRunning, reset, showStats, toggleStats } = useSimulationStore();
  const [showSettings, setShowSettings] = useState(false);
  
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-white/90 rounded-lg shadow-lg p-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setRunning(!isRunning)}
          className="p-2 rounded hover:bg-gray-100"
          aria-label={isRunning ? 'Pause' : 'Play'}
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} />}
        </button>
        
        <button
          onClick={reset}
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
          onClick={toggleStats}
          className={`p-2 rounded hover:bg-gray-100 ${showStats ? 'bg-blue-100' : ''}`}
          aria-label="Statistics"
        >
          <BarChart size={24} />
        </button>
      </div>
      
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </div>
  );
};

export default ControlPanel;