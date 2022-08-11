import { QueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: process.env.NODE_ENV === "test" ? false : true,
    },
  },
});

const defaultQuerySettings = {
  retry: 3, // If a query failes retry it 3 times.
  staleTime: 15 * 60 * 1000, // Store fetched data for 15 minutes.
  select: (res: AxiosResponse) => res.data, // When using Axios the response data is wrapped in an axios object. This function gives us only the actual response data as a result from useQuery.
};

export { queryClient, defaultQuerySettings };
