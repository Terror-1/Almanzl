import { useState } from "react";
import RatingContext from "./RatingContext";

export default function RatingProvider({ children }) {
  const [rating, setRating] = useState(0);

  return (
    <RatingContext.Provider value={[rating, setRating]}>
      {children}
    </RatingContext.Provider>
  );
}
