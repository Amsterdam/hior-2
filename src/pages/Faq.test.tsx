import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import nock from "nock";
import { withTheme } from "../test/utils";
import Faq from "./Faq";

describe("Faq", () => {
  const mockData = {
    results: [
      {
        id: 1,
        answer: "vraag 1",
        question: "antwoord 1",
      },
      {
        id: 2,
        answer: "vraag 2",
        question: "antwoord 2",
      },
      {
        id: 3,
        answer: "vraag 3",
        question: "antwoord 3",
      },
    ],
    count: 3,
  };

  beforeEach(() => {
    nock("http://localhost").get("/vsd/hior_faq/?page=1&page_size=100000&format=json").reply(200, mockData);
  });

  it("renders correctly", async () => {
    const { container } = render(withTheme(<Faq />));

    await screen.findByText("Veelgestelde vragen");

    await waitForElementToBeRemoved(() => screen.getByTestId("loader"));

    expect(await container.querySelectorAll("button").length).toBe(3);

    expect(screen.getByText("vraag 1")).toBeInTheDocument();
    expect(screen.getByText("antwoord 1")).toBeInTheDocument();
    expect(screen.getByText("vraag 2")).toBeInTheDocument();
    expect(screen.getByText("antwoord 2")).toBeInTheDocument();
    expect(screen.getByText("vraag 3")).toBeInTheDocument();
    expect(screen.getByText("antwoord 3")).toBeInTheDocument();
  });
});
