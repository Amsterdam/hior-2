import { useReducer, createContext } from "react";
import filterReducer, { initialState } from "./reducer";

export const FilterContext = createContext(initialState);

// @ts-ignore
const FilterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  return (
    <>
      {/* @ts-ignore */}
      <FilterContext.Provider value={{ state, dispatch }}>{children}</FilterContext.Provider>
    </>
  );
};

export default FilterContextProvider;
