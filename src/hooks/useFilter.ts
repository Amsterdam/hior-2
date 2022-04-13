import { useMemo } from "react";
import { Filter } from "../types";

function useFilter(filter: Filter, data: any[]) {
  return useMemo(() => {
    // First filter by year to reduce the amount of data we need to work with.
    let filteredData: any[] = data;

    if (filter.source) {
      //@ts-ignore
      filteredData = filteredData.filter((d: any) => {
        return d.source === filter.source;
      });
    }

    if (filter.level) {
      //@ts-ignore
      filteredData = filteredData.filter((d: any) => {
        return d.level === filter.level;
      });
    }

    if (filter.theme) {
      //@ts-ignore
      filteredData = filteredData.filter((d: any) => {
        return d.theme === filter.theme;
      });
    }

    if (filter.type) {
      //@ts-ignore
      filteredData = filteredData.filter((d: any) => {
        return d.type === filter.type;
      });
    }

    if (filter.area) {
      //@ts-ignore
      filteredData = filteredData.filter((d: any) => {
        return d.area === filter.area;
      });
    }

    return filteredData;
  }, [data, filter.area, filter.level, filter.source, filter.theme, filter.type]);
}

export default useFilter;
