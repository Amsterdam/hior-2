import { useMemo } from "react";
import { Filter, HiorEnriched } from "../types";

function useFilter(filter: Filter, data: HiorEnriched[]) {
  return useMemo(() => {
    // First filter by year to reduce the amount of data we need to work with.
    let filteredData: HiorEnriched[] = data;

    if (filter.source) {
      filteredData = filteredData.filter((d: any) => {
        return d.source === filter.source;
      });
    }

    if (filter.level) {
      filteredData = filteredData.filter((d: any) => {
        return d.level === filter.level;
      });
    }

    if (filter.theme) {
      filteredData = filteredData.filter((d: any) => {
        return d.theme === filter.theme;
      });
    }

    if (filter.type) {
      filteredData = filteredData.filter((d: any) => {
        return d.type === filter.type;
      });
    }

    if (filter.area) {
      filteredData = filteredData.filter((d: any) => {
        return d.area === filter.area;
      });
    }

    if (filter.query) {
      const re = new RegExp(filter.query, "gim");
      filteredData = filteredData.filter((d: any) => {
        const found = d.text.match(re);
        return found && found[0];
      });

      filteredData = filteredData.filter((d: any) => {
        const found = d.description.match(re);
        return found && found[0];
      });
    }

    return filteredData;
  }, [data, filter]);
}

export default useFilter;
