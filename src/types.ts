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

export interface Filter {
  source: string;
  level: string;
  theme: string;
  type: string;
  area: string;
  query: string;
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

  images: any[];
  documents: any[];
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
}
