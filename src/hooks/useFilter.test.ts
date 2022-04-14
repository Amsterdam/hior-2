import { renderHook } from "@testing-library/react-hooks";

import useFilter from "./useFilter";

describe("useFilter", () => {
  const mockFilter = {
    source: "Omgevingsvisie 2050 (2021)",
    theme: "12. Groen",
    level: "Strategisch Niveau",
    type: "Ambitie",
    area: "Heel Amsterdam",
    query: "",
  };

  const mockData = [
    {
      id: 42,
      level: "Strategisch Niveau",
      source: "Omgevingsvisie 2050 (2021)",
      theme: "12. Groen",
      type: "Ambitie",
      area: "Heel Amsterdam",
    },
  ];

  it("should always return 1 item", () => {
    //@ts-ignore
    const { result } = renderHook(() => useFilter(mockFilter, mockData));

    expect(2).toBe(2);
    expect(result.current).not.toBeUndefined();
    expect(result.current.length).toBe(1);
  });
});
