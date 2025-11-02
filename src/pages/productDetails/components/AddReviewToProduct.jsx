// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import LoadingButton from "../../../components/LoadingButton";
import useReview from "../context/review/useReview";
import useRating from "../context/rating/useRating";
import { useState } from "react";
import Constants from "../../../app/constants";

function AddReviewToProduct() {
  const [showTextAreaToWriteReview] = useReview();
  const [rating, _] = useRating();
  const [reviewText, setReviewText] = useState("");

  async function handleReviewSubmit() {
    if (!reviewText.trim()) return;
    try {
      const res = await fetch(
        `${Constants.BASE_URL}/products/690716ee329f24ecdb9fe8ab/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDYyZDU2ODA4MTJjNjc5ZDkwNWE4NSIsImlhdCI6MTc2MjA4ODQ2MCwiZXhwIjoxNzYyNjkzMjYwfQ.NoFtMph7R1K1espayNGvwJiYugr8C4XYgknk2V_yk60`,
          },
          body: JSON.stringify({ review: reviewText, rating: rating }),
        }
      );

      const data = await res.json();
      console.log("Review submitted:", data);

      setReviewText("");
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  }

  return (
    <div className="mt-8">
      <AnimatePresence>
        {showTextAreaToWriteReview && (
          <div>
            <motion.textarea
              key="review-area"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              placeholder="Write a review..."
              rows={5}
              onChange={(e) => setReviewText(e.target.value)}
              className="border border-gray-300 w-full rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#1E2939]"
            />

            <LoadingButton
              onClick={handleReviewSubmit}
              title="Send"
              width="30%"
              style={{
                margin: "1rem 0 1rem auto",
              }}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AddReviewToProduct;
