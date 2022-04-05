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

    const { container } = render(withTheme(<List />));

    await act(async () => {
      expect(await screen.queryByTestId("list")).toBeInTheDocument();
      expect(await screen.queryByText("Resultaten")).toBeInTheDocument();
    });

    expect(await container.querySelectorAll("BUTTON").length).toBe(2);

    // expect(await screen.queryByText("Niveau")).toBeInTheDocument();
    expect(await screen.queryByText("Strategisch Niveau")).toBeInTheDocument();
    // expect(await screen.queryByText("Thema")).toBeInTheDocument();
    expect(await screen.queryByText("12. Groen")).toBeInTheDocument();
    // expect(await screen.queryByText("Type")).toBeInTheDocument();
    expect(await screen.queryByText("Ambitie")).toBeInTheDocument();
    // expect(await screen.queryByText("Stadsdeel")).toBeInTheDocument();
    expect(await screen.queryByText("Heel Amsterdam")).toBeInTheDocument();

    await screen.debug();
  });
});
