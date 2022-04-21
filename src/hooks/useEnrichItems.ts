import { useContext, useMemo } from "react";
import { FilterContext } from "../filter/FilterContext";
import { actions } from "../filter/reducer";
import { Groups, Properties, Attributes, ItemEnriched, Item } from "../types";

function useEnrichItems(items: Item[], properties: Properties[], attributes: Attributes[]): ItemEnriched[] {
  return useMemo(() => {
    const {
      //@ts-ignore
      // state: { filter, group, groups }
      dispatch,
      // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useContext(FilterContext);

    const enrichedItems: ItemEnriched[] = [];

    const groups: Groups = {
      source: [],
      level: [],
      theme: [],
      type: [],
      area: [],
    };
    console.log("useEnrichItems", items, properties, attributes, enrichedItems);

    dispatch(actions.setGroups(groups));

    return enrichedItems;
  }, [attributes, items, properties]);
}

export default useEnrichItems;
