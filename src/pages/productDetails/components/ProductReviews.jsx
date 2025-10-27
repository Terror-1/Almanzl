import WriteReviewToProduct from "./WriteReviewToProduct";
import AddReviewToProduct from "./AddReviewToProduct";
import Review from "./Review";
import ReviewProvider from "../context/review/ReviewProvider";

function ProductReviews() {
  return (
    <ReviewProvider>
      <div className="mt-20 md:w-[80%] w-full">
        <h2 className="text-2xl font-semibold">Reviews and Rating</h2>

        <WriteReviewToProduct />

        <AddReviewToProduct />
        {Array.from({ length: 5 }).map((_, index) => (
          <Review key={index} />
        ))}
      </div>
    </ReviewProvider>
  );
}

export default ProductReviews;
