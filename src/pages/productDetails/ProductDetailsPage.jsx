import LoadingSpinner from "../../components/LoadingSpinner";
import { useFetch } from "../../hooks/useFetch";
import AddProductToCart from "./components/AddProductToCart";
import ProductDescription from "./components/ProductDescription";
import ProductImages from "./components/ProductImages";
import ProductInfo from "./components/ProductInfo";
import ProductReviews from "./components/ProductReviews";
import SimilarProducts from "./components/SimilarProducts";
import Error from "../../components/Error";

function ProductDetailsPage() {
  const { data, loading, error } = useFetch(
    "products/690716ee329f24ecdb9fe8ab"
  );

  if (error) {
    return <Error message={error} />;
  }

  if (loading) {
    return <LoadingSpinner resource={"Product"} />;
  }
  const product = data.data;

  console.log(`This is the product: ${JSON.stringify(product)}`);

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
        <SimilarProducts />
      </div>
    </div>
  );
}

export default ProductDetailsPage;
