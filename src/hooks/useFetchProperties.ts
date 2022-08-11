import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HIOR_PROPERTIES_URL, requestHeaders } from "../constants";

export function useFetchProperties() {
  return useQuery(
    ["attributes"],
    () => {
      return axios.get<any>(HIOR_PROPERTIES_URL, {
        headers: requestHeaders,
      });
    },
    {
      select: (res) => res.data,
    },
  );
}
