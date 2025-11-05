import { useFetch } from "../hooks/useFetch";
import Error from "./Error";
import LoadingSpinner from "./LoadingSpinner";
import { Link, useLocation } from "react-router-dom";

export default function SubNav() {
  const { data, loading, error } = useFetch("/categories");
  const location = useLocation();

  if (loading) return <LoadingSpinner resource="categories" />;
  if (error) return <Error resource="categories" error={error} />;

  return (
    <div className="w-full bg-secondary text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-start gap-6 px-6 py-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {data?.map((category) => {
          const isActive = location.pathname === `/category/${category._id}`;

          return (
            <Link
              key={category._id}
              to={`/category/${category._id}`}
              className={`text-sm transition-colors duration-200 ${
                isActive
                  ? "text-yellow-400 font-semibold"
                  : "hover:text-yellow-400"
              }`}
            >
              {category.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
