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
  beforeAll(() => {
    nock.disableNetConnect();
  });

  beforeEach(() => {
    nock("http://localhost").get("/vsd/hior_metadata/?page=1&page_size=100000&format=json").reply(200, mockData);
  });

  it("renders correctly", async () => {
    render(withTheme(<UpdatedDate />));

    await screen.findByTestId("updated-date");

    expect(screen.getByTestId("updated-date")).toHaveTextContent("11-3-2022");
  });
});
