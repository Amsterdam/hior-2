import { render, screen, act } from "@testing-library/react";
import axios from "axios";
import { withTheme } from "../test/utils";
import List from "./List";

jest.mock("axios");

describe("List", () => {
  it("renders correctly", async () => {
    // items
    // @ts-ignore
    axios.get.mockResolvedValueOnce({ data: { results: [] } });
    // attributes
    // @ts-ignore
    axios.get.mockResolvedValueOnce({ data: { results: [] } });
    // properties
    // @ts-ignore
    axios.get.mockResolvedValueOnce({ data: { results: [] } });

    render(withTheme(<List />));

    await act(async () => {
      expect(await screen.queryByTestId("list")).toBeInTheDocument();
    });
  });
});
