import { useState, useEffect } from "react";
import CircularProgressIndicator from "../components/CircularProgressIndicator";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${
            import.meta.env.VITE_BASE_URL
          }/orders/get-paginated-user-orders?page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data.data || []);
        setTotalPages(data.totalPages || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [page, limit]);

  if (loading) return <CircularProgressIndicator />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="m-3 p-6 bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-md border border-gray-200 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center border-b pb-2">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 italic">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border px-4 py-3 text-left font-semibold">
                  Order ID
                </th>
                <th className="border px-4 py-3 text-left font-semibold">
                  Payment
                </th>
                <th className="border px-4 py-3 text-left font-semibold">
                  Items
                </th>
                <th className="border px-4 py-3 text-left font-semibold">
                  Shipping Address
                </th>
                <th className="border px-4 py-3 text-left font-semibold">
                  Items Price
                </th>
                <th className="border px-4 py-3 text-left font-semibold">
                  Discount
                </th>
                <th className="border px-4 py-3 text-left font-semibold">
                  Total
                </th>
                <th className="border px-4 py-3 text-left font-semibold">
                  Status
                </th>
                <th className="border px-4 py-3 text-left font-semibold">
                  Paid
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <td className="border px-4 py-2 text-gray-800">
                    {order._id}
                  </td>
                  <td className="border px-4 py-2 text-gray-700 capitalize">
                    {order.paymentMethod}
                  </td>
                  <td className="border px-4 py-2">
                    <ul className="list-disc list-inside text-gray-700">
                      {order.orderItems?.map((item) => (
                        <li key={item._id}>
                          {item.name} × {item.quantity}{" "}
                          <span className="text-sm text-gray-500">
                            (${item.price})
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border px-4 py-2 text-gray-600">
                    {order.shippingAddress?.address},{" "}
                    {order.shippingAddress?.city}
                  </td>
                  <td className="border px-4 py-2 font-medium text-gray-800">
                    ${order.itemsPrice}
                  </td>
                  <td className="border px-4 py-2 text-gray-700">
                    ${order.discountAmount}
                  </td>
                  <td className="border px-4 py-2 font-semibold text-gray-900">
                    ${order.totalPrice}
                  </td>
                  <td
                    className={`border px-4 py-2 capitalize font-semibold ${
                      order.status === "pending"
                        ? "text-yellow-600"
                        : order.status === "confirmed"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="border px-4 py-2">
                    {order.isPaid ? (
                      <span className="text-green-600 font-medium">Paid</span>
                    ) : (
                      <span className="text-red-500 font-medium">Unpaid</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg shadow-sm hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={page === totalPages}
          className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg shadow-sm hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
