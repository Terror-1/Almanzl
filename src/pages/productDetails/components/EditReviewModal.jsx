/* eslint-disable no-unused-vars */
import { useState } from "react";
import api from "../../../lib/axios";
import { motion, AnimatePresence } from "framer-motion";
import LoadingButton from "../../../components/LoadingButton";
import Rating from "../../../components/Rating";
import { toast } from "react-toastify";
import useProductReviews from "../context/productReviews/useProductReviews";
import { useParams } from "react-router-dom";

function EditReviewModal({ review, onClose }) {
  const [rating, setRating] = useState(review.rating);
  const [reviewText, setReviewText] = useState(review.review);
  const [isLoading, setIsLoading] = useState(false);
  const { setProductReviews } = useProductReviews();
  const { id } = useParams();

  async function handleReviewUpdate() {
    if (rating === 0) {
      toast.error("Please provide a rating before submitting.");
      return;
    }

    if (!reviewText.trim()) {
      toast.error("Review text cannot be empty.");
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await api.patch(
        `/products/${id}/reviews/${review._id}`,
        { review: reviewText, rating }
      );

      toast.success("Review updated successfully");

      setProductReviews((prev) =>
        prev.map((r) => (r._id === review._id ? data.data : r))
      );

      onClose();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={onClose}
      >
        <motion.div
          key="modal-content"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-white rounded-2xl p-6 w-[90%] md:w-[500px] shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-semibold mb-3">Edit your review</h2>
          <Rating value={rating} onChange={setRating} size={28} />
          <textarea
            rows={5}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="border border-gray-300 w-full rounded-md p-3 resize-none mt-4 focus:outline-none focus:ring-2 focus:ring-[#1E2939]"
            placeholder="Update your review..."
          />
          <div className="flex justify-end gap-2 mt-5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <LoadingButton
              onClick={handleReviewUpdate}
              title="Update"
              isLoading={isLoading}
              width="30%"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default EditReviewModal;
