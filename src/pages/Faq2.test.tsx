import { render, screen } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";
import axios from "axios";
import { withTheme } from "../test/utils";
import Faq from "./Faq";

jest.mock("axios");

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
  };

  it("renders correctly", async () => {
    //@ts-ignore
    axios.get.mockResolvedValueOnce({ data: mockData });

    const { container } = render(withTheme(<Faq />));

    await act(async () => {
      expect(await screen.queryByTestId("faq")).toBeInTheDocument();
      expect(await screen.queryByText("Veelgestelde vragen")).toBeInTheDocument();

      expect(await screen.queryByTestId("faq")).toBeInTheDocument();

      expect(await container.querySelectorAll("BUTTON").length).toBe(3);

      expect(await screen.queryByText("vraag 1")).toBeInTheDocument();
      expect(await screen.queryByText("antwoord 1")).toBeInTheDocument();
      expect(await screen.queryByText("vraag 2")).toBeInTheDocument();
      expect(await screen.queryByText("antwoord 2")).toBeInTheDocument();
      expect(await screen.queryByText("vraag 3")).toBeInTheDocument();
      expect(await screen.queryByText("antwoord 3")).toBeInTheDocument();
    });
  });
});
