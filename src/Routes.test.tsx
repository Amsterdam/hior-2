import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ThemeProvider } from "@amsterdam/asc-ui";

import App from "./App";

jest.mock("./components/UpdatedDate", () => () => "UpdatedDate");

describe("App", () => {
  it("redirect from / to home is defined", () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </ThemeProvider>,
    );

    expect(screen.queryByTestId("home")).toBeInTheDocument();
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
  });

  it("route to list is defined", () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/list"]}>
          <App />
        </MemoryRouter>
      </ThemeProvider>,
    );

    expect(screen.queryByTestId("list")).toBeInTheDocument();
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
});