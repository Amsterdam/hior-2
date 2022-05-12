import { useCallback, useMemo } from "react";
import { DOCUMENT_URL, IMAGE_URL } from "../constants";
// import { sortAsc } from "../services/utils";
import { Groups, Property, Attribute, ItemEnriched, Item } from "../types";

const useEnrichItems = (
  items: Item[],
  properties: Property[] | undefined,
  attributes: Attribute[] | undefined,
): any => {
  const sortAsc = useCallback((a: string, b: string) => {
    return a < b ? -1 : a > b ? 1 : 0;
  }, []);

  return useMemo(() => {
    if (!items || !properties || !attributes) {
      return [];
    }

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
      const foundThemes = properties.filter((a: any) => i.id === a.item_id && a.name === "Theme");

      const themeValue = foundThemes
        .map((t: any) => t.value)
        .flat()
        .join(", ");

      const newAttr = {};
      foundProps.map((attr: any) => {
        const item = attr.name.toLowerCase();
        // if (item === "theme") return;

        // @ts-ignore
        newAttr[item] = attr.value;
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
        theme: themeValue,
        //@ts-ignore
        images,
        //@ts-ignore
        documents,
      };
    });

    groups.theme = groups.theme.sort((a: any, b: any) => sortAsc(a, b));
    groups.type = groups.type.sort((a: any, b: any) => sortAsc(a, b));
    groups.level = groups.level.sort((a: any, b: any) => sortAsc(a, b));
    groups.source = groups.source.sort((a: any, b: any) => sortAsc(a, b));
    groups.area = groups.area.sort((a: any, b: any) => sortAsc(a, b));

    return { enrichedItems, allGroups: groups };
  }, [attributes, items, properties]);
};

export default useEnrichItems;
