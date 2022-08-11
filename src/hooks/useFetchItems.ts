import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HIOR_ITEMS_URL, requestHeaders } from "../constants";
import { defaultQuerySettings } from "../queryClient";
import { Item } from "../types";

export function useFetchItems() {
  return useQuery(
    ["hior_items"],
    () => {
      return axios.get<{
        results: Item[];
      }>(HIOR_ITEMS_URL, {
        headers: requestHeaders,
      });
    },
    {
      ...defaultQuerySettings,
      select: (res) => res.data,
    },
  );
}
