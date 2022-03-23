export const HIOR_ITEMS_URL = `https://${
  process.env.NODE_ENV === "development" ? "acc." : ""
}api.data.amsterdam.nl/vsd/hior_items/?page=1&page_size=100000&format=json`;

export const HIOR_PROPERTIES_URL = `https://${
  process.env.NODE_ENV === "development" ? "acc." : ""
}api.data.amsterdam.nl/vsd/hior_properties/?page=1&page_size=100000&format=json`;

export const HIOR_ATTRIBUTES_URL = `https://${
  process.env.NODE_ENV === "development" ? "acc." : ""
}api.data.amsterdam.nl/vsd/hior_attributes/?page=1&page_size=100000&format=json`;

