import { SearchFilter, ItemEnriched, Group } from "../types";

function filterItems(filter: SearchFilter, items: ItemEnriched[]) {
  type FilterKeys = keyof SearchFilter;
  let filteredData: ItemEnriched[] = items; // The data we want to filter
  const keys = Object.keys(filter).filter((k) => k !== "query") as FilterKeys[]; // The keys we want to filter for

  keys.forEach((key) => {
    // If we want to filter for this key (because it was selected)
    if (filter[key].length > 0) {
      filteredData = filteredData.filter((item: ItemEnriched) => {
        const values = item[key as Group]; // Get the values for this filter (e.g. source, level, etc) for this item.
        let found = false;
        values.forEach((value: string) => {
          if (found) return;
          // For each filter value of this filter check if the item contains that value (i.e. it should show up in the results)
          found = filter[key].includes(value);
        });

        return found;
      });
    }
  });

  if (filter.query.length > 0) {
    const query = filter.query.toLowerCase();
    filteredData = filteredData.filter((item: ItemEnriched) => {
      return item.text.toLowerCase().includes(query) || item.description.toLowerCase().includes(query);
    });
  }

  return filteredData;
}

export { filterItems };
