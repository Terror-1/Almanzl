import LoadingSpinner from "../../components/LoadingSpinner";
import { useFetch } from "../../hooks/useFetch";
import AddProductToCart from "./components/AddProductToCart";
import ProductDescription from "./components/ProductDescription";
import ProductImages from "./components/ProductImages";
import ProductInfo from "./components/ProductInfo";
import ProductReviews from "./components/ProductReviews";
import SimilarProducts from "./components/SimilarProducts";
import Error from "../../components/Error";
import ProductReviewsProvider from "./context/productReviews/ProductReviewsProvider";
import { useParams } from "react-router-dom";

function ProductDetailsPage() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/products/${id}`);
  if (error) {
    return <Error message={error} />;
  }

  if (loading) {
    return <LoadingSpinner resource={"Product"} />;
  }

  return (
    <ProductReviewsProvider>
      <div className="flex flex-col md:flex-row mx-4 md:mx-10 my-10 gap-15">
        <div className="w-full md:w-2/3">
          <ProductImages product={data} />
          <ProductInfo product={data} />
          <ProductDescription product={data} />
          <AddProductToCart product={data} />
          <ProductReviews />
        </div>

        <div className="w-full md:w-1/3 rounded-lg">
          <SimilarProducts />
        </div>
      </div>
    </ProductReviewsProvider>
  );
}

export default ProductDetailsPage;
