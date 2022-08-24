import { Selector, State } from "./types";

const acc = window?.location?.host?.includes(".acc");

const tst = process.env.NODE_ENV === "test";

const host = (() =>
  tst ? "http://localhost" : acc ? process.env.REACT_APP_HIOR_API_ACC : process.env.REACT_APP_HIOR_API)();

export const IMAGE_URL = "https://131f4363709c46b89a6ba5bc764b38b9.objectstore.eu/hior/Afbeeldingen/";

export const DOCUMENT_URL = "https://131f4363709c46b89a6ba5bc764b38b9.objectstore.eu/hior/Documenten/";

export const HIOR_ITEMS_URL = `${host}/vsd/hior_items/?page=1&page_size=100000&format=json`;

export const HIOR_PROPERTIES_URL = `${host}/vsd/hior_properties/?page=1&page_size=100000&format=json`;

export const HIOR_ATTRIBUTES_URL = `${host}/vsd/hior_attributes/?page=1&page_size=100000&format=json`;

export const HIOR_METADATA_URL = `${host}/vsd/hior_metadata/?page=1&page_size=100000&format=json`;

export const HIOR_FAQ_URL = `${host}/vsd/hior_faq/?page=1&page_size=100000&format=json`;

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

export const requestHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const defaultArea = [{ label: "Heel Amsterdam", value: "Heel Amsterdam" }];

export const initialState = {
  filter: {
    source: "",
    level: "",
    theme: "",
    type: "",
    area: defaultArea[0].value,
    query: "",
  },
  group: "theme",
} as State;
