import { useState, useEffect } from "react";
import axios from "@/lib/axios";
import Constants from "../app/constants";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setError(null);

      try {
        const res = await axios.get(`${Constants.BASE_URL}/${url}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDYyZDU2ODA4MTJjNjc5ZDkwNWE4NSIsImlhdCI6MTc2MjA4ODQ2MCwiZXhwIjoxNzYyNjkzMjYwfQ.NoFtMph7R1K1espayNGvwJiYugr8C4XYgknk2V_yk60",
          },
        });
        console.log(`This is the res after calling from axios: ${res}`);
        setData(res.data);
      } catch (err) {
        if (err.response) {
          setError(
            `Error ${err.response.status}: ${
              err.response.data.message || "Request failed"
            }`
          );
        } else if (err.request) {
          setError("No response from server");
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
