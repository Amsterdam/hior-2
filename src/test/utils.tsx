import React from "react";
import { ThemeProvider } from "@amsterdam/asc-ui";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../queryClient";
import { MemoryRouter } from "react-router";

export const withTheme = (Component: React.ReactNode) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MemoryRouter>{Component}</MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
