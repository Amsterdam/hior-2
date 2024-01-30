import { useQuery } from "@tanstack/react-query";
import { HIOR_PROPERTIES_URL, requestHeaders } from "../constants";
import { defaultQuerySettings } from "../queryClient";
import { Property } from "../types";
import { niceFetch } from "../utils/niceFetch";

export function useFetchProperties() {
  console.log("HIOR_PROPERTIES_URL:", HIOR_PROPERTIES_URL)
  return useQuery(
    ["hior_properties"],
    () => {
      return niceFetch<{
        results: Property[];
      }>(HIOR_PROPERTIES_URL, {
        headers: requestHeaders,
      });
    },
    {
      ...defaultQuerySettings,
      select: (res) => res,
    },
  );
}
