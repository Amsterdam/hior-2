import { useQuery } from "@tanstack/react-query";
import { HIOR_FAQ_URL, requestHeaders } from "../constants";
import { Faq as FaqType } from "../types";
import { defaultQuerySettings } from "../queryClient";
import { niceFetch } from "../utils/niceFetch";

export function useFetchFaq() {
  console.log("HIOR_FAQ_URL:", HIOR_FAQ_URL)
  return useQuery(
    ["hior_faq"],
    () => {
      return niceFetch<{
        results: FaqType[];
      }>(HIOR_FAQ_URL, {
        headers: requestHeaders,
      });
    },
    {
      ...defaultQuerySettings,
      select: (res) => res,
    },
  );
}
