import { useEffect, useState } from "react";
import Constants from "../../../../app/constants";
import { GetProductDetailsContext } from "./GetProductDetailsContext";

export default function GetProductDetailsProvider({ children }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${Constants.BASE_URL}/products/${"690716ee329f24ecdb9fe8ab"}`
        );
        const data = await res.json();
        setProduct(data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <GetProductDetailsContext.Provider value={[product, loading, error]}>
      {children}
    </GetProductDetailsContext.Provider>
  );
}
