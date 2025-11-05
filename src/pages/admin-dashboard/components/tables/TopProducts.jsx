import { CheckCircle, XCircle } from "lucide-react";

const productsData = [
  {
    country: "United States of America",
    revenue: "$7.8K",
    product: "Sony WI-1000XM4",
    category: "Electronics",
    stock: "Available",
    totalSales: "$45,000.00",
  },
  {
    country: "Switzerland",
    revenue: "$7.35K",
    product: "iPhone 14",
    category: "Electronics",
    stock: "Sold Out",
    totalSales: "$86,450.99",
  },
  {
    country: "United Kingdom",
    revenue: "$6.09K",
    product: "Levi's 501 Jeans",
    category: "Apparel",
    stock: "Sold Out",
    totalSales: "$85,250.00",
  },
  {
    country: "Germany",
    revenue: "$6K",
    product: "Product Name",
    category: "Category",
    stock: "Available",
    totalSales: "$40,000.00",
  },
];

const TopProductsTable = ({ data }) => {
  console.log(data);
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Product
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Category
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Stock
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Total Sales
              </th>
            </tr>
          </thead>
          <tbody>
            {(data?.data?.length > 0 ? data.data : productsData).map(
              (product, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {product.product}
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.country} • {product.revenue}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {product.category}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {product.stock === "Available" ? (
                        <>
                          <CheckCircle
                            size={16}
                            className="text-green-500 mr-1"
                          />
                          <span className="text-green-600">Available</span>
                        </>
                      ) : (
                        <>
                          <XCircle size={16} className="text-red-500 mr-1" />
                          <span className="text-red-600">Sold Out</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-900">
                    {product.totalSales}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProductsTable;
