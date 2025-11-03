import { useEffect, useState } from "react";
import ProductReviewsContext from "./ProductReviewsContext";
import { useFetch } from "../../../../hooks/useFetch";
import { useParams } from "react-router-dom";

export default function ProductReviewsProvider({ children }) {
  const [productReviews, setProductReviews] = useState([]);
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/products/${id}/reviews`);

  useEffect(() => {
    if (data) {
      setProductReviews(data);
    }
  }, [data]);

  return (
    <ProductReviewsContext.Provider
      value={{ productReviews, loading, error, setProductReviews }}
    >
      {children}
    </ProductReviewsContext.Provider>
  );
}
