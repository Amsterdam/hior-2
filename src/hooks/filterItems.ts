import { SearchFilter, ItemEnriched } from "../types";

function filterItems(filter: SearchFilter, items: ItemEnriched[]) {
  let filteredData: ItemEnriched[] = items;

  if (filter.source.length > 0) {
    filteredData = filteredData.filter((d: ItemEnriched) => {
      return filter.source.includes(d.source);
    });
  }

  if (filter.level.length > 0) {
    filteredData = filteredData.filter((d: ItemEnriched) => {
      return filter.level.includes(d.level);
    });
  }

  if (filter.theme.length > 0) {
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

  if (filter.type.length > 0) {
    filteredData = filteredData.filter((d: ItemEnriched) => {
      return filter.type.includes(d.type);
    });
  }

  if (filter.area.length > 0) {
    filteredData = filteredData.filter((d: ItemEnriched) => {
      return filter.area.includes(d.area);
    });
  }

  if (filter.query.length > 0) {
    const query = filter.query.toLowerCase();
    filteredData = filteredData.filter((d: ItemEnriched) => {
      return d.text.toLowerCase().includes(query) || d.description.toLowerCase().includes(query);
    });
  }

  return filteredData;
}

export { filterItems };
