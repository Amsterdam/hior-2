import { Selector, State } from "./types";

let azureStorageBaseURL = `${process.env.REACT_APP_AZURE_STORAGE_CONTAINER}/csv`; // PROD Azure Storage Container URL

if (["development", "test"].includes(process.env.NODE_ENV)) {
  azureStorageBaseURL = "http://localhost:3000/static/data"; // Local development URL
} else if (window?.location?.host?.includes("acc.")) {
  azureStorageBaseURL = `${process.env.REACT_APP_AZURE_STORAGE_CONTAINER_ACC}/csv`; // ACC Azure Storage Container URL
}

export const IMAGE_URL = "https://131f4363709c46b89a6ba5bc764b38b9.objectstore.eu/hior/Afbeeldingen/";
export const DOCUMENT_URL = "https://131f4363709c46b89a6ba5bc764b38b9.objectstore.eu/hior/Documenten/";

export const HIOR_ITEMS_URL = `${azureStorageBaseURL}/items.csv`;
export const HIOR_PROPERTIES_URL = `${azureStorageBaseURL}/properties.csv`;
export const HIOR_ATTRIBUTES_URL = `${azureStorageBaseURL}/attributes.csv`;
export const HIOR_METADATA_URL = `${azureStorageBaseURL}/metadata.csv`;
export const HIOR_FAQ_URL = `${azureStorageBaseURL}/faq.csv`;

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
  "Content-Type": "text/csv",
  Accept: "text/csv",
};

export const defaultArea = [{ label: "Heel Amsterdam", value: "Heel Amsterdam" }];

export const initialState = {
  filter: {
    source: [],
    level: [],
    theme: [],
    type: [],
    area: [defaultArea[0].value],
    query: "",
  },
  group: "theme",
} as State;

export const LEVEL_ORDER = {
  "Strategisch Niveau": 1,
  "Tactisch Niveau": 2,
  "Operationeel Niveau": 3,
  Proces: 4,
};

export const TYPE_ORDER = {
  Randvoorwaarde: 1,
  Uitgangspunt: 2,
  Ambitie: 3,
  Advies: 4,
};
