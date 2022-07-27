import { renderHook } from "@testing-library/react";

import useFilter from "./useFilter";

describe("useFilter", () => {
  it("should always return 1 item when searching for filter properties: level, source, theme, type and area", () => {
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
        id: 1,
        text: "empty item",
      },
      {
        id: 42,
        level: "Strategisch Niveau",
        source: "Omgevingsvisie 2050 (2021)",
        theme: "12. Groen",
        type: "Ambitie",
        area: "Heel Amsterdam",
      },
    ];

    //@ts-ignore
    const { result } = renderHook(() => useFilter(mockFilter, mockData));

    expect(result.current).not.toBeUndefined();
    expect(result.current.length).toBe(1);
    expect(result.current[0].id).toBe(42);
  });

  it("should always return 1 item when searching for query in text field", () => {
    const mockFilter = {
      source: "",
      theme: "",
      level: "",
      type: "",
      area: "",
      query: "principe van de Groenvisie luidt",
    };

    const mockData = [
      {
        id: 1,
        text: "empty item",
        description: "",
      },
      {
        id: 42,
        text: "Het vierde principe van de Groenvisie luidt: aan groen werken we samen.",
        description:
          "We werken samen met bewoners, ondernemers, woningbouwcorporaties, kennisinstellingen en andere organisaties in de stad en regio aan het versterken van de stedelijke groene structuur en de groene elementen in wijken en buurten.",
        level: "Strategisch Niveau",
        source: "Omgevingsvisie 2050 (2021)",
        theme: "12. Groen",
        type: "Ambitie",
        area: "Heel Amsterdam",
      },
    ];

    //@ts-ignore
    const { result } = renderHook(() => useFilter(mockFilter, mockData));

    expect(result.current).not.toBeUndefined();
    expect(result.current.length).toBe(1);
    expect(result.current[0].id).toBe(42);
  });

  it("should always return 1 item when searching for query in description field", () => {
    const mockFilter = {
      source: "",
      theme: "",
      level: "",
      type: "",
      area: "",
      query: "bewoners, ondernemers, woningbouwcorporaties",
    };

    const mockData = [
      {
        id: 1,
        text: "empty item",
        description: "",
      },
      {
        id: 42,
        text: "Het vierde principe van de Groenvisie luidt: aan groen werken we samen.",
        description:
          "We werken samen met bewoners, ondernemers, woningbouwcorporaties, kennisinstellingen en andere organisaties in de stad en regio aan het versterken van de stedelijke groene structuur en de groene elementen in wijken en buurten.",
      },
    ];

    //@ts-ignore
    const { result } = renderHook(() => useFilter(mockFilter, mockData));

    expect(result.current).not.toBeUndefined();
    expect(result.current.length).toBe(1);
    expect(result.current[0].id).toBe(42);
  });
});
