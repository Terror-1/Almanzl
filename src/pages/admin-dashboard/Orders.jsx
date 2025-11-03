import { useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";
import ConfirmModal from "./components/ConfirmModal";
import OrderDetailsModal from "./components/OrderDetailsModal";
import OrdersTable from "./components/tables/OrdersTable";
import {
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
} from "../../slices/orderSlice";

const Orders = () => {
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { data, isLoading, error, refetch } = useGetAllOrdersQuery({
    page,
    limit: 5,
  });

  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrder] = useUpdateOrderStatusMutation();

  const handleShowDetails = (order) => setSelectedOrder(order);

  const handleCloseDetails = () => setSelectedOrder(null);

  const handleDelete = (id) => {
    setSelectedOrder({ _id: id });
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteOrder(selectedOrder._id).unwrap();
      toast.success("Order deleted successfully!");
      refetch();
    } catch {
      toast.error("Failed to delete order.");
    } finally {
      setIsConfirmModalOpen(false);
      setSelectedOrder(null);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateOrder({ id, status }).unwrap();
      toast.success(`Order updated to ${status}`);
      refetch();
    } catch {
      toast.error("Failed to update order status.");
    } finally {
      setIsConfirmModalOpen(false);
      setSelectedOrder(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-900">
        Orders Management
      </h1>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <p className="text-center text-red-500 py-10">
          {error?.data?.message || "Failed to load orders"}
        </p>
      ) : (
        <OrdersTable
          orders={data}
          currentPage={page}
          onPageChange={setPage}
          onShowDetails={handleShowDetails}
          onDelete={handleDelete}
        />
      )}

      {selectedOrder && !isConfirmModalOpen && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={handleCloseDetails}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDelete}
        />
      )}

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title="Delete Order"
        message="Are you sure you want to delete this order?"
        onCancel={() => {
          setIsConfirmModalOpen(false);
          setSelectedOrder(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Orders;
