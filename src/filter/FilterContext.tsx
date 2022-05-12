import { useReducer, createContext } from "react";
import filterReducer, { initialState } from "./reducer";
import type { Reducer } from "react";
import { State, Action } from "../types";

export const FilterContext = createContext(initialState);

// @ts-ignore
const FilterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(filterReducer, initialState);

  return (
    <>
      {/* @ts-ignore */}
      <FilterContext.Provider value={{ state, dispatch }}>{children}</FilterContext.Provider>
    </>
  );
};

export default FilterContextProvider;
