import axios from "axios";

export const getByUri = (uri: string) => axios.get(uri)