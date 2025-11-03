import { useContext } from "react";
import { ReviewAreaVisibilityContext } from "./ReviewAreaVisibilityContext";

export default function useReviewAreaVisibility() {
  return useContext(ReviewAreaVisibilityContext);
}
