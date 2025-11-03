/* eslint-disable no-unused-vars */

import { motion, AnimatePresence } from "framer-motion";
import LoadingButton from "../../../components/LoadingButton";
import useReviewAreaVisibility from "../context/reviewAreaVisibility/useReviewAreaVisibility";
import useRating from "../context/rating/useRating";
import { useState } from "react";
import { toast } from "react-toastify";
import useProductReviews from "../context/productReviews/useProductReviews";
import api from "../../../lib/axios";
import { useParams } from "react-router-dom";

function AddReviewToProduct() {
  const [showTextAreaToWriteReview, setShowTextAreaToWriteReview] =
    useReviewAreaVisibility();
  const { id } = useParams();
  const [rating, setRating] = useRating();
  const [reviewText, setReviewText] = useState("");
  const { setProductReviews } = useProductReviews();

  async function handleReviewSubmit() {
    if (rating === 0) {
      toast.error("Please provide a rating before submitting your review.");
      return;
    }

    if (!reviewText.trim()) {
      toast.error("Review text cannot be empty.");
      return;
    }
    try {
      const { data } = await api.post(`/products/${id}/reviews`, {
        review: reviewText,
        rating: rating,
      });

      toast.success("Review added successfully");
      setProductReviews((prevReviews) => [data.data, ...prevReviews]);
      setReviewText("");
      setRating(0);
      setShowTextAreaToWriteReview(false);
    } catch (error) {
      toast.error(
        "There is something wrong while adding your review, Try again later"
      );
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
              value={reviewText}
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
