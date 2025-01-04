import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const GeneticsChart = ({ data }) => {
  return (
    <div>
      <h3 className="font-bold mb-2">Average Genes</h3>
      <LineChart width={300} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="size" stroke="#82ca9d" />
        <Line type="monotone" dataKey="speed" stroke="#8884d8" />
        <Line type="monotone" dataKey="fertility" stroke="#ffc658" />
        <Line type="monotone" dataKey="lifespan" stroke="#ff7300" />
      </LineChart>
    </div>
  );
};

export default GeneticsChart;