import { render, screen } from "@testing-library/react";
import { withTheme } from "./test/utils";
import { vi } from 'vitest'

import App from "./App";

vi.mock("./components/UpdatedDate", () => ({ default: () => "UpdatedDate" }));

describe("App", () => {
  it("renders correctly", () => {
    render(withTheme(<App />));

    expect(screen.queryByTestId("header")).toBeInTheDocument();
    expect(screen.queryByTestId("footer")).toBeInTheDocument();
  });
});
