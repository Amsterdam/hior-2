import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { withTheme } from "./test/utils";
import { ThemeProvider } from "@amsterdam/asc-ui";

import App from "./App";

describe("App", () => {
  it("renders correctly", () => {
    render(withTheme(<App />));

    expect(screen.queryByTestId("header")).toBeInTheDocument();
    expect(screen.queryByTestId("footer")).toBeInTheDocument();
  });

  it("redirect from / to home is defined", () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </ThemeProvider>,
    );

    expect(screen.queryByTestId("home")).toBeInTheDocument();

    expect(screen.queryByTestId("map")).not.toBeInTheDocument();
  });

  it("route to home is defined", () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/home"]}>
          <App />
        </MemoryRouter>
      </ThemeProvider>,
    );

    expect(screen.queryByTestId("home")).toBeInTheDocument();

    expect(screen.queryByTestId("map")).not.toBeInTheDocument();
  });

  it("route to search is defined", () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/search"]}>
          <App />
        </MemoryRouter>
      </ThemeProvider>,
    );

    expect(screen.queryByTestId("home")).toBeInTheDocument();
  });

  it("route to faq is defined", () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/faq"]}>
          <App />
        </MemoryRouter>
      </ThemeProvider>,
    );

    expect(screen.queryByTestId("faq")).toBeInTheDocument();
  });

  it("route to contact is defined", () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/contact"]}>
          <App />
        </MemoryRouter>
      </ThemeProvider>,
    );

    expect(screen.queryByTestId("home")).toBeInTheDocument();
  });
});
