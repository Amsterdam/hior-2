import { createMemoryHistory } from "history";
import { ThemeProvider } from "@amsterdam/asc-ui";
import HistoryRouter from "./HistoryRouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../queryClient";

export const history = createMemoryHistory();

export const withTheme = (Component: any) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <HistoryRouter history={history}>{Component}</HistoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
