import { useMemo } from "react";
import { useFilterState } from "../filter/FilterContext";
import useEnrichedItems from "./useEnrichedItems";
import { filterItems } from "./useFilter";

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

    console.log("useFiltedItems");

    return {
      isLoading,
      filteredItems: filterItems(filter, enrichedItems),
      groups,
    };
  }, [isLoading, filter, enrichedItems, groups]);
}

export default useFilteredItems;
