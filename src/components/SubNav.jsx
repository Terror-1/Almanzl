import { useFetch } from "../hooks/useFetch";

export default function SubNav() {
  const { data, loading, error } = useFetch(
    "https://almanzl.com/api/v1/categories"
  );

  if (loading) {
    return (
      <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-3 flex justify-center">
        <div className="flex items-center gap-2 text-gray-300 text-sm">
          <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
          <span>Loading categories...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-3 flex justify-center">
        <div className="text-red-400 text-sm font-medium flex items-center gap-2">
          <span>Failed to load categories: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-center gap-6 text-sm">
        {data?.map((category) => (
          <button
            key={category.id}
            className="px-4 py-1.5 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
