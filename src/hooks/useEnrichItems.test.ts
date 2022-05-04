import { renderHook } from "@testing-library/react-hooks";
import { Attribute, Item, Property } from "../types";

import useEnrichItems from "./useEnrichItems";

describe("useEnrichItems", () => {
  it("shoulf enrich all items", () => {
    const mockItems: Item[] = [
      {
        description: "De Amsterdamse openbare ruimte speelt een hoofdrol in het sociale en economische succes.",
        id: 2,
        text: "Amsterdam wil een leefbare stad zijn voor mens en dier.",
      },
    ];

    const mockProperties: Property[] = [
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

    const mockAttributes: Attribute[] = [
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

    const { result } = renderHook(() => useEnrichItems(mockItems, mockProperties, mockAttributes));

    expect(result.current).not.toBeUndefined();
  });
});
