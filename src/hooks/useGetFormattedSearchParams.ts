import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchFilter } from "../types";

type SearchFilterKeys = keyof SearchFilter;

function formatSearchParams(searchParams: URLSearchParams) {
  const params: Record<string, string | null> = {};
  [...searchParams.keys()].forEach((key) => (params[key] = searchParams.get(key)));
  return params;
}

export function useGetFormattedSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [formattedSearchParams, setFormattedParams] = useState<Record<SearchFilterKeys, string | null>>(
    formatSearchParams(searchParams),
  );

  useEffect(() => {
    setFormattedParams(formatSearchParams(searchParams));
  }, [searchParams]);

  const setParams = useCallback(
    (filter: SearchFilter) => {
      const params = new URLSearchParams();

      (Object.keys(filter) as SearchFilterKeys[]).forEach((key) => {
        params.set(key, filter[key]);
      });

      setSearchParams(params);
    },
    [setSearchParams],
  );

  return {
    formattedSearchParams,
    setSearchParams: setParams,
  };
}
