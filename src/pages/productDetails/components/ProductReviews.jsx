import WriteReviewToProduct from "./WriteReviewToProduct";
import AddReviewToProduct from "./AddReviewToProduct";
import Review from "./Review";
import ReviewProvider from "../context/review/ReviewProvider";
import ReviewShimmer from "./ReviewShimmer";
import { useFetch } from "../../../hooks/useFetch";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Error from "../../../components/Error";
import RatingProvider from "../context/rating/RatingProvider";

function ProductReviews() {
  const { data, loading, error } = useFetch(
    "products/690716ee329f24ecdb9fe8ab/reviews"
  );

  if (error) {
    return <Error message={error} />;
  }

  return (
    <ReviewProvider>
      <RatingProvider>
        <div className="mt-20 md:w-[80%] w-full">
          <h2 className="text-2xl font-semibold">Reviews and Rating</h2>

          <WriteReviewToProduct />

          <AddReviewToProduct />
          {loading ? (
            Array.from({ length: 3 }).map(() => <ReviewShimmer />)
          ) : data.data.length == 0 ? (
            <p className="text-center text-2xl my-20 font-bold">
              No reviews yet.
            </p>
          ) : (
            data.data.map((review) => (
              <Review key={review._id} review={review} />
            ))
          )}
        </div>
      </RatingProvider>
    </ReviewProvider>
  );
}

export default ProductReviews;
