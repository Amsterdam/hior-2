import { render, screen } from "@testing-library/react";
import { withTheme } from "../test/utils";
import Faq from "./Faq";
import { mockFaqs } from "../test/mock-data/Faq.fixtures";

jest.mock("../hooks/useFetchFaq", () => ({
  useFetchFaq: () => ({ data: mockFaqs, isLoading: false }),
}));

describe("Faq", () => {
  it("renders correctly", async () => {
    const { container } = render(withTheme(<Faq />));

    await screen.findByText("Veelgestelde vragen");

    // TODO: due to no more async data fetching there is no "loading" happening. Could mock that as well or delete this code.
    // await waitForElementToBeRemoved(() => screen.getByTestId("loader"));

    expect(await container.querySelectorAll("button").length).toBe(3);

    expect(screen.getByText("vraag 1")).toBeInTheDocument();
    expect(screen.getByText("antwoord 1")).toBeInTheDocument();
    expect(screen.getByText("vraag 2")).toBeInTheDocument();
    expect(screen.getByText("antwoord 2")).toBeInTheDocument();
    expect(screen.getByText("vraag 3")).toBeInTheDocument();
    expect(screen.getByText("antwoord 3")).toBeInTheDocument();
  });
});
