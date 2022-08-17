import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HIOR_FAQ_URL, requestHeaders } from "../constants";
import { Faq as FaqType } from "../types";
import { defaultQuerySettings } from "../queryClient";

export function useFetchFaq() {
  return useQuery(
    ["hior_faq"],
    () => {
      return axios.get<{
        results: FaqType[];
      }>(HIOR_FAQ_URL, {
        headers: requestHeaders,
      });
    },
    {
      ...defaultQuerySettings,
      select: (res) => res.data,
    },
  );
}
