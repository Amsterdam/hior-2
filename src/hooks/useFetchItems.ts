import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HIOR_ITEMS_URL, requestHeaders } from "../constants";

export function useFetchItems() {
  return useQuery(
    ["attributes"],
    () => {
      return axios.get<any>(HIOR_ITEMS_URL, {
        headers: requestHeaders,
      });
    },
    {
      select: (res) => res.data,
    },
  );
}
