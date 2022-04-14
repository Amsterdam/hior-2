export interface Apicall {
  count: number;
  results: any[];
  _links: any;
}

export interface Action {
  type: string;
  payload: any;
}

export interface Filter {
  source: string;
  level: string;
  theme: string;
  type: string;
  area: string;
  query: string;
}

export interface Hior {
  id: number;
  description: string;
  text: string
}

export interface HiorEnriched {
  id: number;
  description: string;
  text: string

  source: string;
  level: string;
  theme: string;
  type: string;
  area: string;

  images: any[]
  documents: any[]
}

export interface Faq {
  id: number;
  question: string;
  answer: string
}
