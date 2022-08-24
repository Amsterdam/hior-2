import React, { createContext, useContext, useState } from "react";
import { initialState } from "../constants";
import { Group, SearchFilter } from "../types";

export type FilterContext = {
  group: Group;
  setGroup: React.Dispatch<React.SetStateAction<Group>> | undefined;
  filter: SearchFilter;
  setFilter: React.Dispatch<React.SetStateAction<SearchFilter>> | undefined;
};

export const FilterContext = createContext<FilterContext>({
  group: initialState.group,
  setGroup: undefined,
  filter: initialState.filter,
  setFilter: undefined,
});

const FilterContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [group, setGroup] = useState<Group>(initialState.group);
  const [filter, setFilter] = useState<SearchFilter>(initialState.filter);

  return (
    <>
      <FilterContext.Provider
        value={{
          group,
          setGroup,
          filter,
          setFilter,
        }}
      >
        {children}
      </FilterContext.Provider>
    </>
  );
};

export function useFilterState() {
  const { filter, setFilter } = useContext(FilterContext);

  if (setFilter === undefined) {
    throw new Error("setFilter was not defined. Is your component wrapped (at a level) by a Provider component?");
  }

  return { filter, setFilter };
}

export function useGroupState() {
  const { group, setGroup } = useContext(FilterContext);

  if (setGroup === undefined) {
    throw new Error("setGroup was not defined. Is your component wrapped (at a level) by a Provider component?");
  }

  return { group, setGroup };
}

export default FilterContextProvider;
