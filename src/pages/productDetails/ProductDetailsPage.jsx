import LoadingSpinner from "../../components/LoadingSpinner";
import { useFetch } from "../../hooks/useFetch";
import AddProductToCart from "./components/AddProductToCart";
import ProductDescription from "./components/ProductDescription";
import ProductImages from "./components/ProductImages";
import ProductInfo from "./components/ProductInfo";
import ProductReviews from "./components/ProductReviews";
import SimilarProducts from "./components/SimilarProducts";
import Constants from "../../app/constants";

function ProductDetailsPage() {
  const {
    data: product,
    loading,
    error,
  } = useFetch(`${Constants.BASE_URL}/products/690716ee329f24ecdb9fe8ab`);

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  if (loading) {
    return <LoadingSpinner resource={"Product"} />;
  }

  const similarProducts = Array.from({ length: 4 }, () => product);

  return (
    <div className="flex flex-col md:flex-row mx-4 md:mx-10 my-10 gap-15">
      <div className="w-full md:w-2/3">
        <ProductImages product={product} />
        <ProductInfo product={product} />
        <ProductDescription product={product} />
        <AddProductToCart />
        <ProductReviews />
      </div>

      <div className="w-full md:w-1/3 rounded-lg">
        <SimilarProducts similarProducts={similarProducts} />
      </div>
    </div>
  );
}

export default ProductDetailsPage;
