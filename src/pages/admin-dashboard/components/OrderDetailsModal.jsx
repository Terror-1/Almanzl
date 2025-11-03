import { X, CreditCard } from "lucide-react";
import { toast } from "react-toastify";
import { useUpdateOrderPaidStatusMutation } from "../../../slices/orderSlice";

const OrderDetailsModal = ({ order, onClose, onUpdateStatus }) => {
  const [updatePaid, { isLoading: isPaying }] =
    useUpdateOrderPaidStatusMutation();

  if (!order) return null;

  const handleMarkAsPaid = async () => {
    try {
      await updatePaid(order._id).unwrap();
      toast.success("Order marked as paid successfully!");
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update payment status.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Order Details
        </h2>

        {/* Order Information */}
        <div className="space-y-3 text-gray-800">
          <p>
            <strong>Customer:</strong> {order.userId?.name} (
            {order.userId?.email})
          </p>

          <p>
            <strong>Payment Method:</strong>{" "}
            <span className="capitalize">{order.paymentMethod}</span>
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`capitalize font-medium ${
                order.status === "confirmed"
                  ? "text-green-600"
                  : order.status === "cancelled"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              {order.status}
            </span>
          </p>

          <p>
            <strong>Items Price:</strong> ${order.itemsPrice?.toFixed(2)}
          </p>

          <p>
            <strong>Shipping Price:</strong> ${order.shippingPrice?.toFixed(2)}
          </p>

          <p>
            <strong>Total Price:</strong>{" "}
            <span className="font-semibold text-gray-900">
              ${order.totalPrice?.toFixed(2)}
            </span>
          </p>

          <p>
            <strong>Paid:</strong>{" "}
            {order.isPaid ? (
              <span className="text-green-600 font-medium">Yes</span>
            ) : (
              <span className="text-red-600 font-medium">No</span>
            )}
          </p>

          <p>
            <strong>Created At:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>

          <div className="mt-4">
            <strong>Shipping Address:</strong>
            <div className="ml-4 text-sm text-gray-700 mt-1">
              <p>{order.shippingAddress?.fullName}</p>
              <p>{order.shippingAddress?.address}</p>
              <p>
                {order.shippingAddress?.city}, {order.shippingAddress?.country}
              </p>
              <p>
                {order.shippingAddress?.postalCode} |{" "}
                {order.shippingAddress?.phoneNumber}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mt-5">
            <strong>Items:</strong>
            <ul className="divide-y divide-gray-200 mt-2">
              {order.orderItems.map((item, i) => (
                <li key={i} className="py-3 flex items-center gap-4">
                  <img
                    src={item.product.images[0]?.url}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Category: {item.product.category?.name}
                    </p>
                    <p className="text-sm text-gray-700">
                      {item.quantity} × ${item.product.price?.toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-end gap-3 mt-6">
          {/* Payment Button */}
          {!order.isPaid && (
            <button
              onClick={handleMarkAsPaid}
              disabled={isPaying}
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition ${
                isPaying
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              <CreditCard size={18} />
              {isPaying ? "Marking..." : "Mark as Paid"}
            </button>
          )}

          {/* Status Buttons */}
          {["pending", "confirmed", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => onUpdateStatus(order._id, status)}
              disabled={order.status === status}
              className={`px-4 py-2 rounded text-sm font-medium transition ${
                order.status === status
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : status === "confirmed"
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : status === "cancelled"
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-yellow-500 text-white hover:bg-yellow-600"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
