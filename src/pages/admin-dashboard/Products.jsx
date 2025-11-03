import { useState } from "react";
import ProductsTable from "./components/tables/ProductsTable";
import LoadingSpinner from "../../components/LoadingSpinner";
import ConfirmModal from "./components/ConfirmModal";
import { toast } from "react-toastify";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../../slices/productsSlice";

const Products = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const { data, error, isLoading, refetch } = useGetProductsQuery({
    page,
    limit: 5,
  });
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const handleDeleteClick = (id) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProduct(selectedProductId).unwrap();
      toast.success("Product deleted successfully!");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product.");
    } finally {
      setIsModalOpen(false);
      setSelectedProductId(null);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await updateProduct({ id, productData: updatedData }).unwrap();
      toast.success("Product updated successfully!");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Products Management
      </h1>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-10">
          {error?.data?.message || "Failed to fetch products"}
        </div>
      ) : (
        <ProductsTable
          products={data || { data: [], pagination: { totalPages: 1 } }}
          currentPage={page}
          onPageChange={setPage}
          onDelete={handleDeleteClick} // call modal instead of direct delete
          onUpdate={handleUpdate}
        />
      )}

      <ConfirmModal
        isOpen={isModalOpen}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Products;
