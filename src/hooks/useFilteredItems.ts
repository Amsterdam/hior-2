import { useMemo } from "react";
import { useFilterState } from "../filter/FilterContext";
import useEnrichedItems from "./useEnrichedItems";
import { filterItems } from "./filterItems";

function useFilteredItems() {
  const { enrichedItems, groups, isLoading } = useEnrichedItems();
  const { filter } = useFilterState();

  return useMemo(() => {
    if (isLoading || enrichedItems === undefined || groups === undefined) {
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

    return {
      isLoading,
      filteredItems: filterItems(filter, enrichedItems),
      groups,
    };
  }, [isLoading, filter, enrichedItems, groups]);
}

export default useFilteredItems;
