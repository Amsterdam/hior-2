import filterReducer, { initialState, SET_FILTER, SET_GROUP } from "./reducer";

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
});
