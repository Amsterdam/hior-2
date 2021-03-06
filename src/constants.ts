import { Selector } from "./types";

const acc = ""; // process.env.NODE_ENV === "production" ? "" : "acc.";

export const IMAGE_URL = "https://131f4363709c46b89a6ba5bc764b38b9.objectstore.eu/hior/Afbeeldingen/";

export const DOCUMENT_URL = "https://131f4363709c46b89a6ba5bc764b38b9.objectstore.eu/hior/Documenten/";

export const HIOR_ITEMS_URL = `https:/${acc}api.data.amsterdam.nl/vsd/hior_items/?page=1&page_size=100000&format=json`;

export const HIOR_PROPERTIES_URL = `https://${acc}api.data.amsterdam.nl/vsd/hior_properties/?page=1&page_size=100000&format=json`;

export const HIOR_ATTRIBUTES_URL = `https://${acc}api.data.amsterdam.nl/vsd/hior_attributes/?page=1&page_size=100000&format=json`;

export const HIOR_METADATA_URL = `https://${acc}api.data.amsterdam.nl/vsd/hior_metadata/?page=1&page_size=100000&format=json`;

export const HIOR_FAQ_URL = `https://${acc}api.data.amsterdam.nl/vsd/hior_faq/?page=1&page_size=100000&format=json`;

export const ALL_GROUPS: Selector[] = [
  {
    value: "source",
    label: "Bron",
    placeholder: "Kies een bron",
  },
  {
    value: "level",
    label: "Niveau",
    placeholder: "Kies een niveau",
  },
  {
    value: "theme",
    label: "Thema",
    placeholder: "Kies een thema",
  },
  {
    value: "type",
    label: "Type",
    placeholder: "Kies een type",
  },
  {
    value: "area",
    label: "Stadsdeel",
    placeholder: "Kies een stadsdeel",
  },
];
