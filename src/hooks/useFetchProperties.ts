import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HIOR_PROPERTIES_URL, requestHeaders } from "../constants";
import { defaultQuerySettings } from "../queryClient";
import { Property } from "../types";

export function useFetchProperties() {
  return useQuery(
    ["hior_properties"],
    () => {
      return axios.get<{
        results: Property[];
      }>(HIOR_PROPERTIES_URL, {
        headers: requestHeaders,
      });
    },
    {
      ...defaultQuerySettings,
      select: (res) => res.data,
    },
  );
}
