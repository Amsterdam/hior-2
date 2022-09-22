import { useMemo } from "react";
import { useFilterState } from "../filter/FilterContext";
import useEnrichedItems from "./useEnrichedItems";
import { filterItems } from "./filterItems";
import { Groups, ItemEnriched } from "../types";
import { KeyOfLevel, KeyOfType, sortAsc, sortLevel, sortType } from "./sorting";

function getGroups(items: ItemEnriched[]) {
  const groups: Groups = {
    source: [],
    level: [],
    theme: [],
    type: [],
    area: [],
  };

  type GroupKeys = keyof typeof groups;

  // For each group key (source, level, etc)
  (Object.keys(groups) as GroupKeys[]).map((key) => {
    items.forEach((item) => {
      // For each item we got passed
      item[key].forEach((value) => {
        // If the group value for this item is not already in the list of values
        if (!groups[key].includes(value)) {
          // add it, this gives us per group (source, level, etc.) a list of values which can be used to filter
          groups[key].push(value);
        }
      });
    });
  });

  groups.theme = groups.theme.sort(sortAsc);
  groups.type = (groups.type as KeyOfType[]).sort(sortType);
  groups.level = (groups.level as KeyOfLevel[]).sort(sortLevel);
  groups.source = groups.source.sort(sortAsc);
  groups.area = groups.area.sort(sortAsc);

  return groups;
}

function useFilteredItems() {
  const { enrichedItems, isLoading } = useEnrichedItems();
  const { filter } = useFilterState();

  return useMemo(() => {
    if (isLoading || enrichedItems === undefined) {
      return {
        isLoading,
        filteredItems: [],
        groups: {
          source: [],
          level: [],
          theme: [],
          type: [],
          area: [],
        },
      };
    }

    const filteredItems = filterItems(filter, enrichedItems);

    return {
      isLoading,
      filteredItems,
      groups: getGroups(filteredItems),
      filter,
    };
  }, [isLoading, filter, enrichedItems]);
}

export default useFilteredItems;
