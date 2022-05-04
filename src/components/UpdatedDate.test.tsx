import { render, screen, act } from "@testing-library/react";
import axios from "axios";
import { withTheme } from "../test/utils";
import UpdatedDate from "./UpdatedDate";

jest.mock("axios");

describe("UpdatedDate", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockData = {
    results: [
      {
        value: "2022-03-11 00:00:00",
      },
    ],
  };

  it("renders correctly", async () => {
    //@ts-ignore
    axios.get.mockResolvedValueOnce({ data: mockData });

    render(withTheme(<UpdatedDate />));

    await act(async () => {
      //
    });

    expect(await screen.findByTestId("updated-date")).toBeInTheDocument();

    expect(await screen.getByTestId("updated-date")).toHaveTextContent("11-3-2022");
  });
});
