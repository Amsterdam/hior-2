export interface Apicall {
  count: number;
  results: any[];
  _links: any;
}

export interface Action {
  type: string;
  payload: any;
}

export type Group = "theme" | "source" | "level" | "type" | "area";

export interface Groups {
  source: string[];
  level: string[];
  theme: string[];
  type: string[];
  area: string[];
}

export interface SearchFilter {
  source: string;
  level: string;
  theme: string;
  type: string;
  area: string;
  query: string;
}

export interface Property {
  id: number;
  item_id: number;
  name: "Area" | "Type" | "Level" | "Source" | "Theme";
  value: string;
}

export interface Attribute {
  id: number;
  item_id: number;
  name: string;
  value: string;
}

export interface Item {
  id: number;
  description: string;
  text: string;
}

export interface ItemEnriched {
  id: number;
  description: string;
  text: string;

  source: string;
  level: string;
  theme: string;
  type: string;
  area: string;

  images: Image[];
  documents: Document[];

  links: Document[];
}

export interface Image {
  id: number;
  src: string;
  alt: string;
}

export interface Document {
  id: number;
  src: string;
  name: string;
}

export interface Selector {
  label: string;
  value: Group;
  placeholder: string;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
}

export interface State {
  filter: SearchFilter;
  group: Group;
}

export type FormattedOption = { label: string; value: string };
