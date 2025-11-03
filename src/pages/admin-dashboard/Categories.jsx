import { useState } from "react";
import CategoriesTable from "./components/tables/CategoriesTable";
import LoadingSpinner from "../../components/LoadingSpinner";
import ConfirmModal from "./components/ConfirmModal";
import { toast } from "react-toastify";
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../slices/categoriesSlice";

const Categories = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const { data, error, isLoading, refetch } = useGetCategoriesQuery({
    page,
    limit: 5,
  });
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const handleDeleteClick = (id) => {
    setSelectedCategoryId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteCategory(selectedCategoryId).unwrap();
      toast.success("Category deleted successfully!");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete category.");
    } finally {
      setIsModalOpen(false);
      setSelectedCategoryId(null);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedCategoryId(null);
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await updateCategory({ id, ...updatedData }).unwrap();
      toast.success("Category updated successfully!");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update category.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Categories Management
      </h1>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-10">
          {error?.data?.message || "Failed to fetch categories"}
        </div>
      ) : (
        <CategoriesTable
          categories={data?.data || []}
          totalPages={data?.totalPages || 1}
          currentPage={page}
          onPageChange={setPage}
          onDelete={handleDeleteClick}
          onUpdate={handleUpdate}
        />
      )}

      <ConfirmModal
        isOpen={isModalOpen}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Categories;
