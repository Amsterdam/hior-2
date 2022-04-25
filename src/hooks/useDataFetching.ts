import { useCallback, useState } from "react";
import { getByUri } from "../services/utils";

function useDataFetching() {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [results, setResults] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(
    async (endpoint: string) => {
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
    },
    [results],
  );

  return {
    errorMessage,
    loading,
    results,
    fetchData,
  };
}

export default useDataFetching;
