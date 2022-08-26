import { Group, ItemTemp } from "../types";

export const LEVEL_ORDER = {
  "Strategisch Niveau": "1",
  "Tactisch Niveau": "2",
  "Operationeel Niveau": "3",
  Proces: "4",
};

export const TYPE_ORDER = {
  Randvoorwaarde: "1",
  Uitgangspunt: "2",
  Ambitie: "3",
  Advies: "4",
};

export type KeyOfLevel = keyof typeof LEVEL_ORDER;
export type KeyOfType = keyof typeof TYPE_ORDER;

/**
 * Properties can be ordered.
 * Property levels are ordered from 1 to 4, as are property types
 * Property themes are ordered on their own number, e.g "1. xyz" => "01"
 * Property areas are ordered on 1. heel Amsterdam and the other areas alphabetically
 * When ordering properties arrays, the minimum property of the values in the array are returned,
 * e.g. level = ['Proces', 'Tactisch Niveau'] will return 2
 */
export function propertyOrder(property: { name: Group; values: string }) {
  if (property.values.length === 0) {
    return 9;
  }

  /**
   * Returns the order of the nth value of the property
   */
  const getOrder = (value: string) => {
    const ORDER = {
      level: () => LEVEL_ORDER[value as KeyOfLevel] || "9",
      type: () => TYPE_ORDER[value as KeyOfType] || "9",
      area: () => (value === "Heel Amsterdam" ? "0" : "1") + value,
      theme: () => numToString(Number(value.trim().match(/^(\d+)/)![0]), 2),
      source: () => "9",
    };
    return ORDER[property.name] ? ORDER[property.name]() : value;
  };

  /**
   * Returns the minimum order of the values for the given property
   */
  const values = property.values.split(",");
  return values.reduce((minOrder, value) => {
    const propertyOrder = getOrder(value);
    return minOrder === "" || propertyOrder < minOrder ? propertyOrder : minOrder;
  }, "");
}

/**
 * Items are ordered on 1. Theme, 2. Level, 3. Type, 4. ordering in source
 */
export function itemOrder(item: ItemTemp) {
  const orderOf = (name: Group) => propertyOrder({ name, values: item[name] });
  return `${orderOf("theme")}.${orderOf("level")}.${orderOf("type")}.${numToString(item.id, 6)}`;
}

/**
 * Utility method to convert a number to a leftpadded string of length n
 */
const numToString = (n: number, length: number) => n.toString().padStart(length, "0");
