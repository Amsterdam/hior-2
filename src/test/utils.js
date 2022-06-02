import { createMemoryHistory } from "history";
import { ThemeProvider } from "@amsterdam/asc-ui";
import HistoryRouter from "./HistoryRouter";

export const history = createMemoryHistory();

export const withTheme = (Component) => {
  return (
    <ThemeProvider>
      <HistoryRouter history={history}>{Component}</HistoryRouter>
    </ThemeProvider>
  );
};
