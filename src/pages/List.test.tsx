import { render, screen, act } from "@testing-library/react";
import axios from "axios";
import { withTheme } from "../test/utils";
import List from "./List";
import { mockItems, mockProperties, mockAttributes } from "./List.fixtures";

jest.mock("axios");

describe("List", () => {
  it("renders correctly", async () => {
    // items
    // @ts-ignore
    axios.get.mockResolvedValueOnce({ data: mockItems });
    // properties
    // @ts-ignore
    axios.get.mockResolvedValueOnce({ data: mockProperties });
    // attributes
    // @ts-ignore
    axios.get.mockResolvedValueOnce({ data: mockAttributes });

    render(withTheme(<List />));

    await act(async () => {
      expect(await screen.queryByTestId("list")).toBeInTheDocument();
    });
  });
});
