import axios from "axios";

export const getByUri = (uri: string) => axios.get(uri);

export const getCount = (filteredItems: any, group: string, value: string): number => {
  if (!filteredItems) {
    return 0;
  }
  return filteredItems?.filter((item: any) => item[group] === value).length;
};

export function sortAsc(a: string, b: string) {
  return a < b ? -1 : a > b ? 1 : 0;
}