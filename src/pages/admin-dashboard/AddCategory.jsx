import { useCreateCategoryMutation } from "../../slices/categoriesSlice";
import CategoryForm from "./components/forms/CategoryForm";
import { toast } from "react-toastify";

const AddCategory = () => {
  const [addCategory, { isLoading, isError, error }] =
    useCreateCategoryMutation();

  const handleAddCategory = async (categoryData) => {
    try {
      await addCategory(categoryData).unwrap();
      toast.success("Category added successfully!");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add category");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Add New Category</h1>
        <CategoryForm onSubmit={handleAddCategory} isLoading={isLoading} />

        {isError && (
          <p className="text-red-600 mt-3">
            {error?.data?.message || "Something went wrong"}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddCategory;
