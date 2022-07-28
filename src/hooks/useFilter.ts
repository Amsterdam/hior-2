import { useMemo } from "react";
import { SearchFilter, ItemEnriched } from "../types";

function useFilter(filter: SearchFilter, items: ItemEnriched[]): ItemEnriched[] {
  return useMemo(() => {
    if (!items) {
      return [];
    }
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
        const themes = d.theme.split(", ");
        let found = false;
        themes.forEach((theme: string) => {
          if (found) return;
          found = filter.theme.includes(theme);
        });

        return found;
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
