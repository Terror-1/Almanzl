import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const fallbackdata = [
  { month: "Jan", sales: 200 },
  { month: "Feb", sales: 500 },
  { month: "Mar", sales: 100 },
  { month: "Apr", sales: 50 },
  { month: "Jun", sales: 0 },
  { month: "Jul", sales: 200 },
  { month: "Aug", sales: 300 },
  { month: "Sep", sales: 400 },
  { month: "Oct", sales: 350 },
];

const SalesChart = ({ data }) => {
  console.log(data);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Sales Performance Overview</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.length > 0 ? data : fallbackdata}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value}k`, "Sales"]} />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
