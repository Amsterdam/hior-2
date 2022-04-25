import axios from "axios";

export const getByUri = (uri: string) => axios.get(uri);

export const getCount = (filteredItems: any, group: string, value: string): number => {
  if (!filteredItems) {
    return 0;
  }
  return filteredItems?.filter((item: any) => item[group] === value).length;
};
