import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ThemeProvider } from "@amsterdam/asc-ui";

import App from "./App";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

jest.mock("./components/UpdatedDate", () => () => "UpdatedDate");
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};

describe("Routes", () => {
  it("redirect from / to home is defined", () => {
    render(
      <Wrapper>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Wrapper>,
    );

    expect(screen.queryByTestId("home")).toBeInTheDocument();
  });

  it("route to home is defined", () => {
    render(
      <Wrapper>
        <MemoryRouter initialEntries={["/home"]}>
          <App />
        </MemoryRouter>
      </Wrapper>,
    );

    expect(screen.queryByTestId("home")).toBeInTheDocument();
  });

  it("route to faq is defined", async () => {
    render(
      <Wrapper>
        <MemoryRouter initialEntries={["/faq"]}>
          <App />
        </MemoryRouter>
      </Wrapper>,
    );

    expect(await screen.queryByTestId("faq")).toBeInTheDocument();
  });
});
