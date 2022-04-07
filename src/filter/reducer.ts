import { Action, Filter } from "../types";

export const SET_FILTER = `SET_FILTER`;
export const SET_GROUP = `SET_GROUP`;

export const initialState = {
  filter: {
    source: "",
    level: "",
    theme: "",
    type: "",
    area: "",
    query: "",
  } as Filter,
  group: "theme" as "theme" | "source" | "level" | "type",
};

const filterReducer = (state = initialState, action: Action | undefined) => {
  switch (action?.type) {
    case SET_FILTER:
      return {
        ...state,
        filter: {
          ...action.payload,
        },
      };
    case SET_GROUP:
      return {
        ...state,
        group: action.payload,
      };
    default:
      return state;
  }
};

export const actions = {
  setFilter: (payload: Filter) => ({ type: SET_FILTER, payload }),
  setGroup: (payload: string) => ({ type: SET_GROUP, payload }),
};

export default filterReducer;
