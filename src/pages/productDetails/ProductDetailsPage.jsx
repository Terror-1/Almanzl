import LoadingSpinner from "../../components/LoadingSpinner";
import AddProductToCart from "./components/AddProductToCart";
import ProductDescription from "./components/ProductDescription";
import ProductInfo from "./components/ProductInfo";
import ProductReviews from "./components/ProductReviews";
import SimilarProducts from "./components/SimilarProducts";
import Error from "../../components/Error";
import ProductReviewsProvider from "./context/productReviews/ProductReviewsProvider";
import ProductQuantityProvider from "./context/productQuantity/ProductQuantityProvider";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import ProductImagesCarousel from "./components/ProductImagesCarousel";
import CircularProgressIndicator from "../../components/CircularProgressIndicator";
import { useEffect } from "react";

function ProductDetailsPage() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { data: product, loading, error } = useFetch(`/products/${id}`);
  if (error) {
    return <Error message={error} />;
  }

  if (loading) {
    return <CircularProgressIndicator />;
  }

  return (
    <ProductReviewsProvider>
      <div className="flex flex-col md:flex-row mx-4 md:mx-10 my-10 gap-5">
        <div className="w-full md:w-3/4">
          <ProductImagesCarousel product={product} />
          <ProductInfo product={product} />
          <ProductDescription product={product} />
          <ProductQuantityProvider>
            <AddProductToCart product={product} />
          </ProductQuantityProvider>
          <ProductReviews />
        </div>

        <div className="w-full md:w-1/4 rounded-lg">
          <SimilarProducts />
        </div>
      </div>
    </ProductReviewsProvider>
  );
}

export default ProductDetailsPage;
