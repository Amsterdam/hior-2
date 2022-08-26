export const mockItems = {
  results: [
    {
      // this item has only text and desription
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
    {
      id: 3,
      description: "Lange omschrijving 3",
      text: "Behoudens voor verplanten wordt de vergunning of jaarvergunning geweigerd voor zover dit het vellen van een houtopstand betreft",
    },
  ],
};

export const mockEnriched = [
  {
    id: 2,
    description: "Lange omschrijving 2",
    text: "Amsterdam wil een leefbare stad zijn voor mens en dier",
    theme: "12. Groen",
    type: "Ambitie",
    level: "Strategisch Niveau",
    area: "Heel Amsterdam",
    images: [],
    documents: [],
  },
];

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
      item_id: 3,
      name: "Area",
      value: "Centrum",
    },
    {
      id: 7,
      item_id: 3,
      name: "Theme",
      value: "7. Auto",
    },
    {
      id: 8,
      item_id: 3,
      name: "Type",
      value: "Uitgangspunt",
    },
    {
      id: 9,
      item_id: 3,
      name: "Level",
      value: "Proces",
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
    {
      id: 6,
      item_id: 3,
      name: "SourceLink",
      value: "Omgevingsvisie 2050 (2021)",
    },
  ],
};
