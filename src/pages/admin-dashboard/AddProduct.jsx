import { useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import AddProductForm from "./components/forms/AddProductForm";
import { useGetCategoriesQuery } from "../../slices/categoriesSlice";

export default function AddProduct() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { data, isLoading, isError } = useGetCategoriesQuery({
    page: 1,
    limit: 100,
  });

  const categories = data?.data || [];

  if (isError) {
    toast.error("Failed to load categories");
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {!selectedCategory ? (
        <>
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">
            Choose a Category to Add a Product
          </h1>

          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="animate-spin w-8 h-8 text-indigo-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  onClick={() => setSelectedCategory(cat)}
                  className="cursor-pointer bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-transform hover:-translate-y-1"
                >
                  <img
                    src={cat.icon?.url || cat.icon}
                    alt={cat.name}
                    className="w-24 h-24 object-cover rounded-xl mx-auto mb-3 border"
                  />
                  <h3 className="text-lg font-semibold text-center text-gray-800">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-500 text-center mt-2">
                    {cat.description || "No description provided"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <AddProductForm
          category={selectedCategory}
          onBack={() => setSelectedCategory(null)}
        />
      )}
    </div>
  );
}
