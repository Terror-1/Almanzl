import { useContext } from "react";
import ProductContext from "./ProductContext";

export default function useProduct() {
  return useContext(ProductContext);
}
