import { useFetch } from "../hooks/useFetch";
import Error from "./Error";
import LoadingSpinner from "./LoadingSpinner";
export default function SubNav() {
  const { data, loading, error } = useFetch(
    "https://almanzl.com/api/v1/categories"
  );

  if (loading) {
    return <LoadingSpinner resource={"categories"} />;
  }

  if (error) {
    return <Error resource={"categories"} error={error} />;
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
