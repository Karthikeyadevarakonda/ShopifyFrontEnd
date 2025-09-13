import { useEffect, useState } from "react";
import axios from "axios";

export default function useApi(url) {
  const BASE_URL = "http://localhost:8080/api";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}${url}`);
        setData(res.data);
      } catch (err) {
        console.error(`ERROR IN FETCHING THE URL ${url}`, err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
