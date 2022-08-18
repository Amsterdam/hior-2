import React, { useReducer, createContext, useContext } from "react";
import type { Reducer } from "react";
import filterReducer, { initialState } from "./reducer";
import { State, Action } from "../types";

export type FilterContext = {
  state: State;
  dispatch?: React.Dispatch<Action>;
};

export const FilterContext = createContext<FilterContext>({ state: initialState });

// Use state instead of reducer?

const FilterContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(filterReducer, initialState);

  return (
    <>
      <FilterContext.Provider value={{ state, dispatch }}>{children}</FilterContext.Provider>
    </>
  );
};

export function useDispatch() {
  const { dispatch } = useContext(FilterContext);

  if (dispatch === undefined) {
    throw Error("No dispatch property found. Is your component wrapped (at a level) by a Provider component?");
  }

  return dispatch;
}

export function useFilterState() {
  const { state } = useContext(FilterContext);

  return state;
}

export default FilterContextProvider;
