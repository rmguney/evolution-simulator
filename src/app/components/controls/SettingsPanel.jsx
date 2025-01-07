import { useState } from 'react';
import useSimulationStore from '../../store/simulationStore';

const SettingsPanel = ({ onClose }) => {
  const { worldSize, waterPercentage, initialCritters, initialPlants, setWorldConfig } = useSimulationStore();
  const [settings, setSettings] = useState({
    worldSize,
    waterPercentage,
    initialPlants,
    initialCritters,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setWorldConfig(settings);
    onClose();
  };

  return (
    <div className="absolute top-16 right-0 bg-white/95 p-4 rounded-lg shadow-lg w-64">
      <h3 className="font-bold mb-4">World Settings</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">World Size</label>
          <input
            type="range"
            min="5"
            max="20"
            step="1"
            value={settings.worldSize}
            onChange={(e) => setSettings(s => ({ ...s, worldSize: parseInt(e.target.value) }))}
            className="w-full"
          />
          <span className="text-sm">{settings.worldSize}x{settings.worldSize}</span>
        </div>

        <div>
          <label className="block text-sm mb-1">Water Percentage</label>
          <input
            type="range"
            min="0"
            max="0.4"
            step="0.05"
            value={settings.waterPercentage}
            onChange={(e) => setSettings(s => ({ ...s, waterPercentage: parseFloat(e.target.value) }))}
            className="w-full"
          />
          <span className="text-sm">{Math.round(settings.waterPercentage * 100)}%</span>
        </div>
        
        <div>
          <label className="block text-sm mb-1">Initial Plants</label>
          <input
            type="number"
            min="1"
            max="100"
            value={settings.initialPlants}
            onChange={(e) => setSettings(s => ({ ...s, initialPlants: parseInt(e.target.value) }))}
            className="w-full px-2 py-1 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm mb-1">Initial Critters</label>
          <input
            type="number"
            min="1"
            max="50"
            value={settings.initialCritters}
            onChange={(e) => setSettings(s => ({ ...s, initialCritters: parseInt(e.target.value) }))}
            className="w-full px-2 py-1 border rounded"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Create World
        </button>
      </form>
    </div>
  );
};

export default SettingsPanel;