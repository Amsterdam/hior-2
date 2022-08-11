import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HIOR_METADATA_URL, requestHeaders } from "../constants";

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
    ["metadata"],
    () => {
      return axios.get<MetaData>(HIOR_METADATA_URL, {
        headers: requestHeaders,
      });
    },
    {
      select: (res) => res.data,
    },
  );
}
