import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ascDefaultTheme, GlobalStyle, ThemeProvider } from "@amsterdam/asc-ui";
import App from "./App";
import { queryClient } from "./queryClient";
import "./index.scss";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <ThemeProvider
      theme={{
        ...ascDefaultTheme,
        typography: { ...ascDefaultTheme.typography, fontFamily: "Amsterdam Sans, Arial, Helvetica, sans-serif" },
      }}
    >
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
