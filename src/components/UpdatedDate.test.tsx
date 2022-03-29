import { render, screen } from "@testing-library/react";
import { withTheme } from "../test/utils";
import { getByUri } from "../services/api"
import UpdatedDate from "./UpdatedDate";

jest.mock('../services/api');


describe("UpdatedDate", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });



  it("renders correctly", () => {
    getByUri.mockImplementation(() => Promise.resolve({
      results: [{
        value: "2022-03-11 00:00:00"
      }]
    });

    render(withTheme(<UpdatedDate />));

    expect(screen.queryByTestId("updated-date")).toBeInTheDocument();
  });
});
