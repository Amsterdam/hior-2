import { useMemo } from "react";
import { Filter, ItemEnriched } from "../types";

function useFilter(filter: Filter, items: ItemEnriched[]): ItemEnriched[] {
  return useMemo(() => {
    let filteredData: ItemEnriched[] = items;

    if (filter.source) {
      filteredData = filteredData.filter((d: ItemEnriched) => {
        return filter.source.includes(d.source);
      });
    }

    if (filter.level) {
      filteredData = filteredData.filter((d: ItemEnriched) => {
        return filter.level.includes(d.level);
      });
    }

    if (filter.theme) {
      filteredData = filteredData.filter((d: ItemEnriched) => {
        return filter.theme.includes(d.theme);
      });
    }

    if (filter.type) {
      filteredData = filteredData.filter((d: ItemEnriched) => {
        return filter.type.includes(d.type);
      });
    }

    if (filter.area) {
      filteredData = filteredData.filter((d: ItemEnriched) => {
        return filter.area.includes(d.area);
      });
    }

    if (filter.query) {
      const query = filter.query.toLowerCase();
      filteredData = filteredData.filter((d: ItemEnriched) => {
        return d.text.toLowerCase().includes(query) || d.description.toLowerCase().includes(query);
      });
    }

    return filteredData;
  }, [items, filter]);
}

export default useFilter;
