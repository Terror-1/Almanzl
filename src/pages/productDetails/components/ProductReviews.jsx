import WriteReviewToProduct from "./WriteReviewToProduct";
import AddReviewToProduct from "./AddReviewToProduct";
import Review from "./Review";
import ReviewAreaVisibilityProvider from "../context/reviewAreaVisibility/ReviewAreaVisibilityProvider";
import ReviewShimmer from "./ReviewShimmer";
import Error from "../../../components/Error";
import RatingProvider from "../context/rating/RatingProvider";
import useProductReviews from "../context/productReviews/useProductReviews";

function ProductReviews() {
  const { productReviews, loading, error } = useProductReviews();
  if (error) {
    return <Error message={error} />;
  }

  return (
    <ReviewAreaVisibilityProvider>
      <RatingProvider>
        <div className="mt-20 md:w-[80%] w-full">
          <h2 className="text-2xl font-semibold">Reviews and Rating</h2>

          <WriteReviewToProduct />

          <AddReviewToProduct />
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <ReviewShimmer key={index} />
            ))
          ) : productReviews.length == 0 ? (
            <p className="text-center text-2xl my-20 font-bold">
              No reviews yet.
            </p>
          ) : (
            productReviews.map((review) => (
              <Review key={review._id} review={review} />
            ))
          )}
        </div>
      </RatingProvider>
    </ReviewAreaVisibilityProvider>
  );
}

export default ProductReviews;
