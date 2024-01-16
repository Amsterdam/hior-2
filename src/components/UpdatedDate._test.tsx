import { render, screen } from "@testing-library/react";
import { withTheme } from "../test/utils";
import UpdatedDate from "./UpdatedDate";
import { mockMetaData } from "../test/mock-data/UpdatedDate.fixtures";

jest.mock("../hooks/useFetchMetaData", () => ({
  useFetchMetaData: () => ({ data: mockMetaData, isFetched: true, isSuccess: true }),
}));

describe("UpdatedDate", () => {
  it("renders correctly", async () => {
    render(withTheme(<UpdatedDate />));

    await screen.findByTestId("updated-date");

    expect(screen.getByTestId("updated-date")).toHaveTextContent("11-3-2022");
  });
});
