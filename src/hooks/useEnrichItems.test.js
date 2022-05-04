import { renderHook } from "@testing-library/react-hooks";
// import React from "react";
import { FilterContext } from "../filter/FilterContext";
import { initialState } from "../filter/reducer";

import useEnrichItems from "./useEnrichItems";

describe("useEnrichItems", () => {
  const spy = jest.fn();

  // eslint-disable-next-line react/prop-types
  const FilterContextProvider = ({ children }) => (
    <FilterContext.Provider value={{ state: initialState, dispatch: spy }}>{children}</FilterContext.Provider>
  );

  const wrapper = ({ children }) => <FilterContextProvider>{children}</FilterContextProvider>;

  it("shoulf enrich all items", () => {
    const mockItems = [
      {
        description: "De Amsterdamse openbare ruimte speelt een hoofdrol in het sociale en economische succes.",
        id: 2,
        text: "Amsterdam wil een leefbare stad zijn voor mens en dier.",
      },
    ];

    const mockProperties = [
      {
        id: 3,
        item_id: 2,
        name: "Area",
        value: "Heel Amsterdam",
      },
      {
        id: 2,
        item_id: 2,
        name: "Theme",
        value: "12. Groen",
      },
      {
        id: 4,
        item_id: 2,
        name: "Type",
        value: "Ambitie",
      },
      {
        id: 5,
        item_id: 2,
        name: "Level",
        value: "Strategisch Niveau",
      },
    ];

    const mockAttributes = [
      {
        id: 2,
        item_id: 2,
        name: "Image",
        value: "omgevingsvisie (2).jpg",
      },
      {
        id: 1,
        item_id: 2,
        name: "Image",
        value: "omgevingsvisie (1).jpg",
      },
      {
        id: 3,
        item_id: 2,
        name: "Image",
        value: "omgevingsvisie (5).jpg",
      },
      {
        id: 5,
        item_id: 2,
        name: "SourceLink",
        value: "Omgevingsvisie 2050 (2021)",
      },
    ];

    const { result } = renderHook(() => useEnrichItems(mockItems, mockProperties, mockAttributes), { wrapper });

    expect(result.current).toBeDefined();
    expect(result.current.length).toBe(1);
    expect(result.current[0].images.length).toBe(3);
    expect(result.current[0].documents.length).toBe(1);

    expect(result.current[0].id).toBe(2);
    expect(result.current[0].theme).toBe("12. Groen");
    expect(result.current[0].type).toBe("Ambitie");
    expect(result.current[0].level).toBe("Strategisch Niveau");
    expect(result.current[0].area).toBe("Heel Amsterdam");
  });
});
