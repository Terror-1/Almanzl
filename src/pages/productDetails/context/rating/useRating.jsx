import { useContext } from "react";
import RatingContext from "./RatingContext";

export default function useRating() {
  return useContext(RatingContext);
}
