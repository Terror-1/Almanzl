import { useParams, Link } from "react-router-dom";
import { useGetProductsByCategoryQuery } from "../slices/productsSlice";
import Product from "../components/Product";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { data, isLoading, error } = useGetProductsByCategoryQuery(categoryId);

  if (isLoading)
    return (
      <div className="py-12 px-22">
        <div className="grid gap-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 animate-pulse">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-lg p-4 shadow-sm bg-white">
              <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load products. Please try again.
      </p>
    );

  const products = data?.data || [];

  return (
    <div className="py-12 px-22">
      <div className="grid gap-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="hover:scale-105 transition-transform"
          >
            <Product product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
