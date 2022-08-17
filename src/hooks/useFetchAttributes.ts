import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HIOR_ATTRIBUTES_URL, requestHeaders } from "../constants";
import { defaultQuerySettings } from "../queryClient";
import { Attribute } from "../types";

export function useFetchAttributes() {
  return useQuery(
    ["hior_attributes"],
    () => {
      return axios.get<{
        results: Attribute[];
      }>(HIOR_ATTRIBUTES_URL, {
        headers: requestHeaders,
      });
    },
    {
      ...defaultQuerySettings,
      select: (res) => res.data,
    },
  );
}
