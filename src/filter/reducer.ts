import { Action, State, SearchFilter } from "../types";

export const SET_FILTER = `SET_FILTER`;
export const SET_GROUP = `SET_GROUP`;

export const defaultArea = [{ label: "Heel Amsterdam", value: "Heel Amsterdam" }];

export const initialState = {
  filter: {
    source: "",
    level: "",
    theme: "",
    type: "",
    area: defaultArea[0].value,
    query: "",
  },
  group: "theme",
} as State;

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
  setFilter: (payload: SearchFilter) => ({ type: SET_FILTER, payload }),
  setGroup: (payload: string) => ({ type: SET_GROUP, payload }),
};

export default filterReducer;
