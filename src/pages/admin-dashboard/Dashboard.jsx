import {
  useGetOverviewQuery,
  useGetSalesPerformanceQuery,
  useGetTopProductsQuery,
  useGetSalesByGovernorateQuery,
} from "../../slices/statisticsSlice";
import SalesChart from "./components/charts/SalesChart";
import MetricCard from "./components/cards/MetricCard";
import TopProductsTable from "./components/tables/TopProducts";
import CustomerDistributionChart from "./components/charts/CustomerDistributionChart";
import LoadingSpinner from "../../components/LoadingSpinner";

const Dashboard = () => {
  const {
    data: overview,
    isLoading: overviewLoading,
    error: overviewError,
  } = useGetOverviewQuery();
  const {
    data: salesPerformance,
    isLoading: salesLoading,
    error: salesError,
  } = useGetSalesPerformanceQuery();
  const {
    data: salesByGovernorate,
    isLoading: salesByGovernorateLoading,
    error: salesByGovernorateError,
  } = useGetSalesByGovernorateQuery();
  const {
    data: topProducts,
    isLoading: productsLoading,
    error: productsError,
  } = useGetTopProductsQuery();
  console.log(salesByGovernorate);

  const isLoading =
    overviewLoading ||
    salesLoading ||
    productsLoading ||
    salesByGovernorateLoading;
  const error =
    overviewError || salesError || productsError || salesByGovernorateError;

  const metrics = [
    {
      title: "Total Revenue",
      value: overview?.data?.totalRevenue,
      change: "3.05% increase from last month",
      isPositive: true,
    },
    {
      title: "Total Number Of Orders",
      value: overview?.data?.totalOrders,
      change: "3.05% increase from last month",
      isPositive: true,
    },
    {
      title: "Total Number Of Customers",
      value: overview?.data?.totalCustomers || "5.17K",
      change: "2.35% decrease from last month",
      isPositive: false,
    },
  ];

  return isLoading ? (
    <div className="flex justify-center items-center h-64">
      <LoadingSpinner />
    </div>
  ) : error ? (
    <div className="flex flex-col justify-center items-center h-64 text-center text-red-600">
      <h2 className="text-lg font-semibold mb-2">Failed to Load Dashboard</h2>
      <p className="text-sm text-gray-700">
        {error?.data?.message ||
          "Something went wrong. Please try again later."}
      </p>
    </div>
  ) : (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome Back, Osama
        </h1>
        <p className="text-gray-600">Here is your store overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            isPositive={metric.isPositive}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Sales Performance
          </h2>
          <SalesChart data={salesPerformance} />
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 items-center justify-center">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Customer Distribution by Country
          </h2>
          <CustomerDistributionChart data={salesByGovernorate} />
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Top Selling Products
        </h2>
        <TopProductsTable data={topProducts} />
      </div>
    </div>
  );
};

export default Dashboard;
