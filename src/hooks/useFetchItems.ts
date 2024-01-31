import { useQuery } from "@tanstack/react-query";
import { HIOR_ITEMS_URL, requestHeaders } from "../constants";
import { defaultQuerySettings } from "../queryClient";
import { Item } from "../types";
import { niceFetch } from "../utils/niceFetch";

export function useFetchItems() {
  return useQuery(
    ["hior_items"],
    () => {
      return niceFetch<{
        results: Item[];
      }>(HIOR_ITEMS_URL, {
        headers: requestHeaders,
      });
    },
    {
      ...defaultQuerySettings,
      select: (res) => res,
    },
  );
}
