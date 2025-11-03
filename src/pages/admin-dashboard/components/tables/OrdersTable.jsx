import { Eye, Trash2 } from "lucide-react";

const OrdersTable = ({
  orders,
  currentPage,
  onPageChange,
  onShowDetails,
  onDelete,
}) => {
  if (!orders?.data || orders.data.length === 0)
    return <p className="text-center text-gray-500 py-10">No orders found</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">All Orders</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 border-b text-gray-600">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Paid</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.data.map((order, index) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4">
                  {index + 1 + (currentPage - 1) * 5}
                </td>

                <td className="py-3 px-4">
                  <p className="font-medium text-gray-900">
                    {order.userId?.name || "—"}
                  </p>
                  <p className="text-xs text-gray-500">{order.userId?.email}</p>
                </td>

                <td className="py-3 px-4 font-semibold text-gray-900">
                  ${order.totalPrice.toFixed(2)}
                </td>

                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* ✅ Paid Column */}
                <td className="py-3 px-4">
                  {order.isPaid ? (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      No
                    </span>
                  )}
                </td>

                <td className="py-3 px-4 text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="py-3 px-4 flex gap-2">
                  <button
                    onClick={() => onShowDetails(order)}
                    className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    <Eye size={16} /> Details
                  </button>

                  <button
                    onClick={() => onDelete(order._id)}
                    className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-3 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-100"
        >
          Prev
        </button>

        <span className="text-sm text-gray-700">
          Page {currentPage} of {orders.totalPages}
        </span>

        <button
          disabled={currentPage === orders.totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrdersTable;
