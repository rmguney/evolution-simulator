import useSimulationStore from '../../store/simulationStore';

const SpeedControls = () => {
  const { speed, setSpeed } = useSimulationStore();
  
  const speedOptions = [
    { label: '1x', value: 1 },
    { label: '10x', value: 10 },
    { label: '50x', value: 50 },
    { label: '100x', value: 100 }
  ];
  
  return (
    <div className="flex gap-2">
      {speedOptions.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => setSpeed(value)}
          className={`px-3 py-1 rounded ${
            speed === value ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default SpeedControls;