import { SearchFilter, ItemEnriched, Group } from "../types";

function filterItems(filter: SearchFilter, items: ItemEnriched[]) {
  type FilterKeys = keyof SearchFilter;
  let filteredData: ItemEnriched[] = items;
  const keys = Object.keys(filter).filter((k) => k !== "query") as FilterKeys[];

  keys.forEach((key) => {
    if (filter[key].length > 0) {
      filteredData = filteredData.filter((d: ItemEnriched) => {
        const values = d[key as Group];
        let found = false;
        values.forEach((value: string) => {
          if (found) return;
          found = filter[key].includes(value);
        });

        return found;
      });
    }
  });

  if (filter.query.length > 0) {
    const query = filter.query.toLowerCase();
    filteredData = filteredData.filter((d: ItemEnriched) => {
      return d.text.toLowerCase().includes(query) || d.description.toLowerCase().includes(query);
    });
  }

  return filteredData;
}

export { filterItems };
