import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

const PopulationChart = ({ data }) => {
  return (
    <div>
      <h3 className="font-bold mb-2">Population</h3>
      <LineChart width={300} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default PopulationChart;