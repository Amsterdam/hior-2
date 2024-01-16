import { useMemo } from "react";
import { DOCUMENT_URL, IMAGE_URL } from "../constants";
import { Attribute, ItemEnriched, Item, Group, Image, Document } from "../types";
import { useFetchAttributes } from "./useFetchAttributes";
import { useFetchProperties } from "./useFetchProperties";
import { useFetchItems } from "./useFetchItems";
import { itemOrder } from "./sorting";

type Return = {
  enrichedItems: ItemEnriched[] | undefined;
  isLoading: boolean;
};

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

    const enrichedItems: ItemEnriched[] = items.results.map((i: Item) => {
      const foundProps = properties.results.filter((a: any) => a.item_id !== '' && i.id === a.item_id);

      const newProps: { [key in Group]: string[] } = {
        theme: [],
        source: [],
        level: [],
        type: [],
        area: [],
      };

      foundProps.map((attr) => {
        const item = attr.name.toLowerCase() as Group;

        newProps[item].push(attr.value);
      });

      const foundAttr = attributes.results.filter((a: Attribute) => i.id === a.item_id);

      const images: Image[] = [];
      const documents: Document[] = [];
      const links: Document[] = [];
      foundAttr.forEach((a) => {
        if (a.name === "Image") {
          images.push({
            id: a.id,
            src: `${IMAGE_URL}${a.value}`,
            alt: a.value,
          });
        }

        if (a.name === "SourceLink") {
          documents.push({
            id: a.id,
            src: `${DOCUMENT_URL}${a.value}.pdf`,
            name: a.value,
          });
        }

        if (a.name === "Link") {
          links.push({
            id: a.id,
            src: `${DOCUMENT_URL}${a.value}`,
            name: a.value,
          });
        }
      });

      const sortKey = itemOrder({
        id: i.id,
        ...newProps,
      });

      return {
        ...i,
        ...newProps,
        images,
        documents,
        links,
        sortKey,
        themeSortKey: sortKey.substring(3),
      };
    });

    return { enrichedItems, isLoading };
  }, [attributes, items, properties, isLoading]);
};

export default useEnrichedItems;
