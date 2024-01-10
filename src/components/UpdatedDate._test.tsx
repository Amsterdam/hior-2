import { render, screen } from "@testing-library/react";
import nock from "nock";
import { withTheme } from "../test/utils";
import UpdatedDate from "./UpdatedDate";

const mockData = {
  results: [
    {
      value: "2022-03-11 00:00:00",
    },
  ],
};

describe("UpdatedDate", () => {
  beforeEach(() => {
    nock("http://localhost:3000").get("/static/data/metadata.csv").reply(200, mockData);
  });

  it("renders correctly", async () => {
    render(withTheme(<UpdatedDate />));

    await screen.findByTestId("updated-date");

    expect(screen.getByTestId("updated-date")).toHaveTextContent("11-3-2022");
  });
});
