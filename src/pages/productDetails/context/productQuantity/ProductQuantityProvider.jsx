import { useState } from "react";
import { ProductQuantityContext } from "./ProductQuantityContext";

export default function ProductQuantityProvider({ children }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <ProductQuantityContext.Provider value={[quantity, setQuantity]}>
      {children}
    </ProductQuantityContext.Provider>
  );
}
