import { useContext } from "react";
import { GetProductDetailsContext } from "./GetProductDetailsContext";

export default function useGetProductDetails() {
  return useContext(GetProductDetailsContext);
}
