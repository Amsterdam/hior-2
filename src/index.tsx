import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ascDefaultTheme, GlobalStyle, ThemeProvider } from "@amsterdam/asc-ui";
import App from "./App";
import { queryClient } from "./queryClient";
import AmsterdamSans from "./AmsterdamSans";
import TelemetryProvider from "./telemetry-provider";
import { getAppInsights } from "./TelemetryService";

const container = document.getElementById("root");
const root = createRoot(container!);

let appInsights = null;

declare global {
  interface Window {
    _env_: any;
  }
}

root.render(
  <React.StrictMode>
    <ThemeProvider
      theme={{
        ...ascDefaultTheme,
        typography: { ...ascDefaultTheme.typography, fontFamily: "Amsterdam Sans, Arial, Helvetica, sans-serif" },
      }}
    >
      <AmsterdamSans />
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TelemetryProvider
            connectionString={window?._env_?.REACT_APP_APPLICATIONINSIGHTS_CONNECTION_STRING}
            after={() => {
              appInsights = getAppInsights;
            }}
          >
            <App />
          </TelemetryProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
