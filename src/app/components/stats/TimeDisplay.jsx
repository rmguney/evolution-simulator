import useSimulationStore from '../../store/simulationStore';

const TimeDisplay = () => {
  const { elapsedTime, realTime } = useSimulationStore();
  
  return (
    <div className="mb-4">
      <div>Simulation Time: {elapsedTime.toFixed(1)}s</div>
      <div>Real Time: {realTime.toFixed(1)}s</div>
    </div>
  );
};

export default TimeDisplay;