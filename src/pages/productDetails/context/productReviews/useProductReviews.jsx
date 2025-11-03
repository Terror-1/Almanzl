import { useContext } from "react";
import ProductReviewsContext from "./ProductReviewsContext";

export default function useProductReviews() {
  return useContext(ProductReviewsContext);
}
