import { useEffect, useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import ProductContext from "./ProductContext";

export default function ProductProvider({ children }) {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/products/${id}`);
  const [product, setProduct] = useState(data);

  useEffect(() => {
    if (data) {
      setProduct({ ...data });
    }
  }, [data]);

  return (
    <ProductContext.Provider
      value={{ product: product ?? data, loading, error, setProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}
