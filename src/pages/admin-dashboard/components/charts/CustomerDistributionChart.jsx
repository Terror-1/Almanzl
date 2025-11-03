import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const customerDistribution = [
  { name: "New Cairo", value: 35 },
  { name: "October", value: 25 },
  { name: "Giza", value: 20 },
  { name: "Mansoura", value: 20 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

const CustomerDistributionChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Customer Distribution</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.length > 0 ? data : customerDistribution}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {(data.length > 0 ? data : customerDistribution).map(
                (entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                )
              )}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomerDistributionChart;
