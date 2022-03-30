import { render, screen } from "@testing-library/react";
import axios from "axios";
import { withTheme } from "../test/utils";
import UpdatedDate from "./UpdatedDate";

jest.mock('axios');

describe("UpdatedDate", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockData = {
    results: [{
      value: "2022-03-11 00:00:00"
    }]
  };


  it("renders correctly", () => {
    axios.get.mockResolvedValueOnce({ data: mockData });

    render(withTheme(<UpdatedDate />));

    expect(screen.queryByTestId("updated-date")).toBeInTheDocument();
  });
});
