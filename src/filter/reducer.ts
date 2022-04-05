/* eslint-disable no-case-declarations */
export const SET_FILTER = `SET_FILTER`;
export const SET_SORT = `SET_SORT`;

export const initialState = {
  filter: {
    source: "",
    level: "",
    thene: "",
    type: "",
    area: "",
    query: "",
  },
  sort: "theme",
};

const filterReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        filter: {
          ...state,
          ...action.payload,
        },
      };
      case SET_SORT:
        return {
          ...state,
          sort: action.payload,
        };
      default:
      return state;
  }
};

export const actions = {
  setFilter: (payload: any) => ({ type: SET_FILTER, payload }),
  setSort: (payload: any) => ({ type: SET_SORT, payload }),
};

export default filterReducer;
