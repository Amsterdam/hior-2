import { useContext, useMemo } from "react";
import { DOCUMENT_URL, IMAGE_URL } from "../constants";
import { FilterContext } from "../filter/FilterContext";
import { actions } from "../filter/reducer";
import { Groups, Property, Attribute, ItemEnriched, Item } from "../types";

const useEnrichItems = (
  items: Item[],
  properties: Property[] | undefined,
  attributes: Attribute[] | undefined,
): ItemEnriched[] => {
  return useMemo(() => {
    if (!items || !properties || !attributes) {
      return [];
    }

    const {
      //@ts-ignore
      dispatch,
      // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useContext(FilterContext);

    const groups: Groups = {
      source: [],
      level: [],
      theme: [],
      type: [],
      area: [],
    };

    //@ts-ignore
    const enrichedItems: ItemEnriched[] = items.map((i: Item) => {
      const foundProps = properties.filter((a: any) => i.id === a.item_id);
      const newAttr = {};
      foundProps.map((attr: any) => {
        // @ts-ignore
        newAttr[attr.name.toLowerCase()] = attr.value;
      });
      const foundAttr = attributes.filter((a: Attribute) => i.id === a.item_id);

      // @ts-ignore
      const images = [];
      foundAttr.forEach((a: Attribute) => {
        if (a.name === "Image") {
          images.push({
            id: a.id,
            src: `${IMAGE_URL}${a.value}`,
            alt: a.value,
          });
        }
      });

      // @ts-ignore
      const documents = [];
      foundAttr.forEach((a: any) => {
        if (a.name === "SourceLink") {
          documents.push({
            id: a.id,
            src: `${DOCUMENT_URL}${a.value}.pdf`,
            name: a.value,
          });
        }
      });

      // @ts-ignore
      if (!groups.source.includes(newAttr.source)) groups.source.push(newAttr.source);
      // @ts-ignore
      if (!groups.level.includes(newAttr.level)) groups.level.push(newAttr.level);
      // @ts-ignoren
      if (!groups.theme.includes(newAttr.theme)) groups.theme.push(newAttr.theme);
      // @ts-ignore
      if (!groups.type.includes(newAttr.type)) groups.type.push(newAttr.type);
      // @ts-ignore
      if (!groups.area.includes(newAttr.area)) groups.area.push(newAttr.area);

      return {
        ...i,
        ...newAttr,
        //@ts-ignore
        images,
        //@ts-ignore
        documents,
      };
    });

    // sort alphabettically
    // const sorted = items.sort((a: any, b: any) => {
    //   if (a.text < b.text) {
    //     return -1;
    //   }
    //   if (a.text > b.text) {
    //     return 1;
    //   }
    //   return 0;
    // });

    dispatch(actions.setGroups(groups));

    return enrichedItems;
  }, [attributes, items, properties]);
};

export default useEnrichItems;
