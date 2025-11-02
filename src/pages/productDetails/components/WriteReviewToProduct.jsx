import Rating from "../../../components/Rating";
import useRating from "../context/rating/useRating";
import WriteReviewTextButton from "./WriteReviewTextButton";

function WriteReviewToProduct() {
  const [_, setRating] = useRating();
  return (
    <div className="mt-5 rounded-2xl bg-[#F6F6F6] p-4">
      <h2 className="text-xl">Rate this and tell others what you think</h2>
      <div className="flex mt-5 justify-between">
        <Rating onChange={(val) => setRating(val)} />
        <WriteReviewTextButton />
      </div>
    </div>
  );
}

export default WriteReviewToProduct;
