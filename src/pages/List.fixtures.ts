export const mockItems = {
  results: [
    {
      // this item has ot text and desription
      id: 1,
      description: "Lange omschrijving 1",
      text: 'De Omgevingsvisie 2050 onderscheidt zes soort plekken van "stedelijke betekekenis".',
    },
    {
      // this item has all properties and attributes
      id: 2,
      description: "Lange omschrijving 2",
      text: "Amsterdam wil een leefbare stad zijn voor mens en dier",
    },
  ],
};

export const mockProperties = {
  results: [
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
      d: 4,
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
  ],
};

export const mockAttributes = {
  results: [
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
  ],
};
