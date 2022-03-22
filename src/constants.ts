export const API_URL = `https://${
  process.env.NODE_ENV === "development" ? "acc." : ""
}api.data.amsterdam.nl/vsd/hior_attributes/?page=1&page_size=100000&format=json`;
