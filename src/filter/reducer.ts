import { Action, Group, Groups, Filter, ItemEnriched } from "../types";

export const SET_FILTER = `SET_FILTER`;
export const SET_GROUP = `SET_GROUP`;
export const SET_GROUPS = `SET_GROUPS`;
export const SET_FILTERED_ITEMS = `SET_FILTERED_ITEMS`;

export const initialState = {
  filter: {
    source: "",
    level: "",
    theme: "",
    type: "",
    area: "",
    query: "",
  } as Filter,
  group: "theme" as Group,
  groups: {
    source: [],
    level: [],
    theme: [],
    type: [],
    area: [],
  } as Groups,
  filteredItems: [] as ItemEnriched[],
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
    case SET_GROUPS:
      return {
        ...state,
        groups: {
          ...action.payload,
        },
      };
    case SET_FILTERED_ITEMS:
      return {
        ...state,
        filteredItems: [
          ...action.payload
        ],
      };
    default:
      return state;
  }
};

export const actions = {
  setFilter: (payload: Filter) => ({ type: SET_FILTER, payload }),
  setGroup: (payload: string) => ({ type: SET_GROUP, payload }),
  setGroups: (payload: Groups) => ({ type: SET_GROUPS, payload }),
  setFilteredItems: (payload: ItemEnriched[]) => ({ type: SET_FILTERED_ITEMS, payload }),
};

export default filterReducer;
