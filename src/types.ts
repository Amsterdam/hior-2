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
