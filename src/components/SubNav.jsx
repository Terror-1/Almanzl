import { useFetch } from "../hooks/useFetch";
import Error from "./Error";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";

export default function SubNav() {
  const { data, loading, error } = useFetch("/categories");

  if (loading) return <LoadingSpinner resource="categories" />;
  if (error) return <Error resource="categories" error={error} />;

  return (
    <div className="w-full bg-secondary text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-start gap-6 px-6 py-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {data?.map((category) => (
          <Link
            key={category._id}
            to={`/category/${category._id}`}
            className="text-sm hover:text-yellow-400 transition-colors duration-200"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
