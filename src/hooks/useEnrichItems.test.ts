import { renderHook } from "@testing-library/react";
import useEnrichItems from "./useEnrichItems";

describe("useEnrichItems", () => {
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
      {
        id: 6,
        item_id: 2,
        name: "Source",
        value: "Omgevingsvisie 2050 (2021)",
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

    const { result } = renderHook(() => useEnrichItems(mockItems, mockProperties, mockAttributes));

    expect(result.current).toBeDefined();
    expect(result.current.enrichedItems.length).toBe(1);
    expect(result.current.enrichedItems[0].images.length).toBe(3);
    expect(result.current.enrichedItems[0].documents.length).toBe(1);

    expect(result.current.enrichedItems[0].id).toBe(2);
    expect(result.current.enrichedItems[0].source).toBe("Omgevingsvisie 2050 (2021)");
    expect(result.current.enrichedItems[0].theme).toBe("12. Groen");
    expect(result.current.enrichedItems[0].type).toBe("Ambitie");
    expect(result.current.enrichedItems[0].level).toBe("Strategisch Niveau");
    expect(result.current.enrichedItems[0].area).toBe("Heel Amsterdam");

    expect(result.current.allGroups.theme.length).toBe(1);
    expect(result.current.allGroups.type.length).toBe(1);
    expect(result.current.allGroups.level.length).toBe(1);
    expect(result.current.allGroups.source.length).toBe(1);
    expect(result.current.allGroups.area.length).toBe(1);
  });
});
