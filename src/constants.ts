import { Selector, State } from "./types";

let azureStorageCsvBaseURL = `${window?._env_?.REACT_APP_AZURE_STORAGE_CONTAINER}/${window?._env_?.REACT_APP_AZURE_STORAGE_CONTAINER_NAME_CSV}`;
if (["development", "test"].includes(process.env.NODE_ENV)) {
  azureStorageCsvBaseURL = "http://localhost:3000/static/data"; // Local development and testing URL (download the files manually)
}

export const IMAGE_URL = `${window?._env_?.REACT_APP_AZURE_STORAGE_CONTAINER}/${window?._env_?.REACT_APP_AZURE_STORAGE_CONTAINER_NAME_IMAGES}/`;
export const DOCUMENT_URL = `${window?._env_?.REACT_APP_AZURE_STORAGE_CONTAINER}/${window?._env_?.REACT_APP_AZURE_STORAGE_CONTAINER_NAME_DOCUMENTS}/`;

export const HIOR_ITEMS_URL = `${azureStorageCsvBaseURL}/items.csv`;
export const HIOR_PROPERTIES_URL = `${azureStorageCsvBaseURL}/properties.csv`;
export const HIOR_ATTRIBUTES_URL = `${azureStorageCsvBaseURL}/attributes.csv`;
export const HIOR_METADATA_URL = `${azureStorageCsvBaseURL}/metadata.csv`;
export const HIOR_FAQ_URL = `${azureStorageCsvBaseURL}/faqs.csv`;

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
  "Content-type": "text/csv",
  "Accept": "text/csv",
  "Access-Control-Allow-Origin": "*",
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
