import { useContext } from "react";
import { ProductsContext } from "../context/product/ProductContext";
import Error from "./Error";
import Product from "./Product";
import { ShoppingBag } from "lucide-react";
import FilterSidebar from "./FilterSidebar";
import ShimmerProducts from "./ShimmerProducts";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const { products, loading, error, page, setPage, limit } =
    useContext(ProductsContext);

    if (loading) {
        return <ShimmerProducts count={limit} />;
    }

  if (error) {
    return <Error resource="products" error={error} />;
  }

  if (products?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center">
          <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            No Products Found
          </h3>
          <p className="text-gray-500 mb-6">
            There are no products available on this page.
          </p>
          <button
            onClick={() => setPage(1)}
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors duration-200"
          >
            Go to First Page
          </button>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    setPage((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-10">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Our Products</h2>
            <p className="text-gray-500 text-sm mt-2 sm:mt-0">
              {products?.length || 0} items found
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
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

          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={handlePrev}
              disabled={page <= 1}
              className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="font-semibold">{page}</span>
            <button
              onClick={handleNext}
              disabled={products?.length !== limit}
              className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        <FilterSidebar />
      </div>
    </div>
  );
};

export default AllProducts;
