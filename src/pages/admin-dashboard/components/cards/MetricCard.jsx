import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const MetricCard = ({ title, value, change, isPositive = true }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <div
          className={`flex items-center ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
          <span className="ml-1 text-sm font-medium">{change}</span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
