import { useMemo } from "react";
import { Filter, HiorEnriched } from "../types";

function useFilter(filter: Filter, data: HiorEnriched[]): HiorEnriched[] {
  return useMemo(() => {
    let filteredData: HiorEnriched[] = data;

    if (filter.source) {
      filteredData = filteredData.filter((d: HiorEnriched) => {
        return filter.source.includes(d.source);
      });
    }

    if (filter.level) {
      filteredData = filteredData.filter((d: HiorEnriched) => {
        return filter.level.includes(d.level);
      });
    }

    if (filter.theme) {
      filteredData = filteredData.filter((d: HiorEnriched) => {
        return filter.theme.includes(d.theme);
      });
    }

    if (filter.type) {
      filteredData = filteredData.filter((d: HiorEnriched) => {
        return filter.type.includes(d.type);
      });
    }

    if (filter.area) {
      filteredData = filteredData.filter((d: HiorEnriched) => {
        return filter.area.includes(d.area);
      });
    }

    if (filter.query) {
      const query = filter.query.toLowerCase();
      filteredData = filteredData.filter((d: HiorEnriched) => {
        return d.text.toLowerCase().includes(query) || d.description.toLowerCase().includes(query);
      });
    }

    return filteredData;
  }, [data, filter]);
}

export default useFilter;
