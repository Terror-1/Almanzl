import { useContext } from "react";
import Rating from "../../../components/Rating";
import useProductReviews from "../context/productReviews/useProductReviews";
import useRating from "../context/rating/useRating";
import WriteReviewTextButton from "./WriteReviewTextButton";
import { AuthContext } from "../../authentication/context/AuthContext";

function WriteReviewToProduct() {
  const { productReviews } = useProductReviews();
  const [rating, setRating] = useRating();
  const { user } = useContext(AuthContext);

  if (
    user === null ||
    productReviews.filter((review) => review.user._id === user?._id).length !==
      0
  ) {
    return null;
  }
  return (
    <div className="mt-5 rounded-2xl bg-[#F6F6F6] p-4">
      <h2 className="text-xl">Rate this and tell others what you think</h2>
      <div className="flex mt-5 justify-between">
        <Rating value={rating} onChange={(val) => setRating(val)} />
        <WriteReviewTextButton />
      </div>
    </div>
  );
}

export default WriteReviewToProduct;
