import { useContext } from "react";
import { ProductQuantityContext } from "./ProductQuantityContext";

export default function useProductQuantity() {
  return useContext(ProductQuantityContext);
}
