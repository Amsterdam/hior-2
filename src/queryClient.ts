import { QueryClient } from "@tanstack/react-query";

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
};

export { queryClient, defaultQuerySettings };
