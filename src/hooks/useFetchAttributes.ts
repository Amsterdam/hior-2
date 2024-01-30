import { useQuery } from "@tanstack/react-query";
import { HIOR_ATTRIBUTES_URL, requestHeaders } from "../constants";
import { defaultQuerySettings } from "../queryClient";
import { Attribute } from "../types";
import { niceFetch } from "../utils/niceFetch";

export function useFetchAttributes() {
  console.log("HIOR_ATTRIBUTES_URL:", HIOR_ATTRIBUTES_URL)
  return useQuery(
    ["hior_attributes"],
    () => {
      return niceFetch<{
        results: Attribute[];
      }>(HIOR_ATTRIBUTES_URL, {
        headers: requestHeaders,
      });
    },
    {
      ...defaultQuerySettings,
      select: (res) => res,
    },
  );
}
