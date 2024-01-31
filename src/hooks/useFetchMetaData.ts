import { useQuery } from "@tanstack/react-query";
import { HIOR_METADATA_URL, requestHeaders } from "../constants";
import { defaultQuerySettings } from "../queryClient";
import { niceFetch } from "../utils/niceFetch";

type MetaData = {
  count: number;
  results: MetaDataResult[];
};

type MetaDataResult = {
  id: number;
  property: string;
  value: string;
};

export default function useFetchMetaData() {
  return useQuery(
    ["hior_metadata"],
    () => {
      return niceFetch<MetaData>(HIOR_METADATA_URL, {
        headers: requestHeaders,
      });
    },
    {
      ...defaultQuerySettings,
      select: (res) => res,
    },
  );
}
