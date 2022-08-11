import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Group, SearchFilter } from "../types";

function formatSearchParams(searchParams: URLSearchParams) {
  const params: Record<string, string | null> = {};
  [...searchParams.keys()].forEach((key) => (params[key] = searchParams.get(key)));
  return params;
}

export function useGetFormattedSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [formattedSearchParams, setFormattedParams] = useState<Record<Group, string | null>>(
    formatSearchParams(searchParams),
  );

  useEffect(() => {
    setFormattedParams(formatSearchParams(searchParams));
  }, [searchParams]);

  const setParams = useCallback(
    (filter: SearchFilter) => {
      const params = new URLSearchParams();

      type FilterKey = keyof SearchFilter;

      (Object.keys(filter) as FilterKey[]).forEach((key) => {
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
