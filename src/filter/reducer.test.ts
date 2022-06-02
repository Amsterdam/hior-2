import filterReducer, { initialState, SET_FILTER, SET_FILTERED_ITEMS, SET_GROUP, SET_GROUPS } from "./reducer";

describe("filterReducer", () => {
  it("should return initial state oogn default", () => {
    //@ts-ignore
    expect(filterReducer()).toEqual(initialState);
  });

  describe("actions", () => {
    it("setFilter", () => {
      const action = {
        type: SET_FILTER,
        payload: {
          source: "foo",
          level: "",
          theme: "",
          type: "",
          area: "",
          query: "",
        },
      };

      filterReducer(initialState, action);

      const action2 = {
        type: SET_FILTER,
        payload: {
          source: "",
          level: "bar",
          theme: "",
          type: "",
          area: "",
          query: "",
        },
      };

      expect(filterReducer(initialState, action2)).toEqual({
        ...initialState,
        filter: action2.payload,
      });
    });

    it("setGroup", () => {
      const action = {
        type: SET_GROUP,
        payload: "level",
      };

      expect(filterReducer(initialState, action)).toEqual({
        ...initialState,
        group: action.payload,
      });
    });
  });

  it("setGroups", () => {
    const action = {
      type: SET_GROUPS,
      payload: {
        source: ["foo"],
        level: [],
        theme: [],
        type: [],
        area: [],
      },
    };

    filterReducer(initialState, action);

    const action2 = {
      type: SET_GROUPS,
      payload: {
        source: [],
        level: ["bar"],
        theme: [],
        type: [],
        area: [],
      },
    };

    expect(filterReducer(initialState, action2)).toEqual({
      ...initialState,
      groups: action2.payload,
    });
  });

  it("setFilteredItems", () => {
    const action = {
      type: SET_FILTERED_ITEMS,
      payload: [
        {
          id: 42,
        },
      ],
    };

    expect(filterReducer(initialState, action)).toEqual({
      ...initialState,
      filteredItems: action.payload,
    });
  });
});
