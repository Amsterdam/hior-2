import { useMemo } from "react";
import { DOCUMENT_URL, IMAGE_URL } from "../constants";
import { Groups, Attribute, ItemEnriched, Item, Group } from "../types";
import { useFetchAttributes } from "./useFetchAttributes";
import { useFetchProperties } from "./useFetchProperties";
import { useFetchItems } from "./useFetchItems";

type Return = {
  enrichedItems: ItemEnriched[] | undefined;
  groups: Groups | undefined;
  isLoading: boolean;
};

function sortAsc(a: string, b: string) {
  const foundA = a.match(/^(\d+\d*?)/);
  if (foundA) {
    const foundB = b.match(/^(\d+\d*?)/);
    if (foundB) {
      return parseInt(foundA[1], 10) < parseInt(foundB[1], 10)
        ? -1
        : parseInt(foundA[1], 10) > parseInt(foundB[1], 10)
        ? 1
        : 0;
    }
  }

  return a < b ? -1 : a > b ? 1 : 0;
}

const useEnrichedItems = (): Return => {
  const { data: properties, isLoading: isLoadingProps } = useFetchProperties();
  const { data: attributes, isLoading: isLoadingAttrs } = useFetchAttributes();
  const { data: items, isLoading: isLoadingItems } = useFetchItems();

  const isLoading = isLoadingProps || isLoadingAttrs || isLoadingItems;

  return useMemo(() => {
    if (isLoading || !items?.results || !properties?.results || !attributes?.results) {
      return {
        enrichedItems: undefined,
        groups: undefined,
        isLoading,
      };
    }

    const groups: Groups = {
      source: [],
      level: [],
      theme: [],
      type: [],
      area: [],
    };

    const enrichedItems: ItemEnriched[] = items.results.map((i: Item) => {
      const foundProps = properties.results.filter((a: any) => i.id === a.item_id);
      const foundThemes = properties.results.filter((a: any) => i.id === a.item_id && a.name === "Theme");

      const themeValue = foundThemes
        .map((t: any) => t.value)
        .flat()
        .join(", ");

      const newAttr: { [key in Group]: string } = {
        theme: "",
        source: "",
        level: "",
        type: "",
        area: "",
      };
      foundProps.map((attr) => {
        const item = attr.name.toLowerCase() as Group;

        newAttr[item] = attr.value;
      });
      const foundAttr = attributes.results.filter((a: Attribute) => i.id === a.item_id);

      const images: { id: number; src: string; alt: string }[] = [];
      foundAttr.forEach((a) => {
        if (a.name === "Image") {
          images.push({
            id: a.id,
            src: `${IMAGE_URL}${a.value}`,
            alt: a.value,
          });
        }
      });

      const documents: { id: number; src: string; name: string }[] = [];
      foundAttr.forEach((a: any) => {
        if (a.name === "SourceLink") {
          documents.push({
            id: a.id,
            src: `${DOCUMENT_URL}${a.value}.pdf`,
            name: a.value,
          });
        }
      });

      if (!groups.source.includes(newAttr.source)) groups.source.push(newAttr.source);
      if (!groups.level.includes(newAttr.level)) groups.level.push(newAttr.level);
      if (!groups.theme.includes(newAttr.theme)) groups.theme.push(newAttr.theme);
      if (!groups.type.includes(newAttr.type)) groups.type.push(newAttr.type);
      if (!groups.area.includes(newAttr.area)) groups.area.push(newAttr.area);

      return {
        ...i,
        ...newAttr,
        theme: themeValue,
        images,
        documents,
      };
    });

    groups.theme = groups.theme.sort((a: any, b: any) => sortAsc(a, b));
    groups.type = groups.type.sort((a: any, b: any) => sortAsc(a, b));
    groups.level = groups.level.sort((a: any, b: any) => sortAsc(a, b));
    groups.source = groups.source.sort((a: any, b: any) => sortAsc(a, b));
    groups.area = groups.area.sort((a: any, b: any) => sortAsc(a, b));

    return { enrichedItems, groups, isLoading };
  }, [attributes, items, properties, isLoading]);
};

export default useEnrichedItems;
