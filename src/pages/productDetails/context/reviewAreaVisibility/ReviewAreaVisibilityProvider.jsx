import { useState } from "react";
import { ReviewAreaVisibilityContext } from "./ReviewAreaVisibilityContext";

export default function ReviewAreaVisibilityProvider({ children }) {
  const [showTextAreaToWriteReview, setShowTextAreaToWriteReview] =
    useState(false);

  return (
    <ReviewAreaVisibilityContext.Provider
      value={[showTextAreaToWriteReview, setShowTextAreaToWriteReview]}
    >
      {children}
    </ReviewAreaVisibilityContext.Provider>
  );
}
