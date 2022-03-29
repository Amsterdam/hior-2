import { useState } from "react";
import { getByUri } from "../services/api";

function useDataFetching() {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchData(endpoint: string) {
    setLoading(true);
    try {
      const data = await getByUri(endpoint);
      
      setResults(data.data);
    } catch (e) {
      // @ts-ignore
      setErrorMessage(e.message);
    }

    setLoading(false);
    return results;
  }

  return {
    errorMessage,
    loading,
    results,
    fetchData,
  };
}

export default useDataFetching;
