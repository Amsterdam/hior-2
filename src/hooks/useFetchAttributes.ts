import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HIOR_ATTRIBUTES_URL, requestHeaders } from "../constants";
import { defaultQuerySettings } from "../queryClient";

export function useFetchAttributes() {
  return useQuery(
    ["hior_attributes"],
    () => {
      return axios.get<any>(HIOR_ATTRIBUTES_URL, {
        headers: requestHeaders,
      });
    },
    {
      ...defaultQuerySettings,
      select: (res) => res.data,
    },
  );
}
