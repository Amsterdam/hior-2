import { useCallback, useContext, useEffect, useState } from "react";
import "react-multiple-select-dropdown-lite/dist/index.css";
import styled from "styled-components";
import { Button, Input, Label, themeSpacing } from "@amsterdam/asc-ui";
//@ts-ignore
import MultiSelect from "react-multiple-select-dropdown-lite";
import { FilterContext } from "../filter/FilterContext";
import { actions, initialState } from "../filter/reducer";

const StyledDiv = styled.div`
  margin-bottom: ${themeSpacing(10)};
  width: 100%;

  label {
    margin-top: ${themeSpacing(3)};
    font-weight: bold;
  }
`;

const StyledMultiSelect = styled(MultiSelect)`
  width: 100%;
`;

const SyledColumn = styled.div`
  width: 50%;
  float: left;
`;

const Filter = () => {
  const {
    //@ts-ignore
    state: { groups, filteredItems },
    //@ts-ignore
    dispatch,
    //@ts-ignore
  } = useContext(FilterContext);

  const [source, setSoure] = useState<string[]>([]);
  const [level, setLevel] = useState<string[]>([]);
  const [theme, setTheme] = useState<string[]>([]);
  const [type, setType] = useState<string[]>([]);
  const [area, setArea] = useState<string[]>([]);

  const [filter, setFilter] = useState<any>({
    source: "",
    level: "",
    theme: "",
    type: "",
    area: "",
    query: "",
  });

  const updateFilter = useCallback(
    (group: string, values: string) => {
      const newFilter = {
        ...filter,
        [group]: values,
      };

      setFilter(newFilter);

      dispatch(actions.setFilter(newFilter));
    },
    [filter, dispatch],
  );

  useEffect(() => {
    setSoure(formatGroup("source"));
    setLevel(formatGroup("level"));
    setTheme(formatGroup("theme"));
    setType(formatGroup("type"));
    setArea(formatGroup("area"));
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups]);

  const formatGroup = useCallback((group: string) => {
    return groups[group].map((option: string) => ({
      label: option,
      value: option,
    }));
  }, [groups]);

  const resetFilter = useCallback(() => {
    dispatch(actions.setFilter(initialState.filter));
  }, [dispatch]);

  return (
    <StyledDiv data-testid="filter">
      <form>
        <SyledColumn>
          <Label label="Bron" />
          <StyledMultiSelect
            name="source"
            placeholder="Kies een bron"
            options={source}
            onChange={(values: string) => {
              updateFilter("source", values);
            }}
          />
          <Label label="Thema" />
          <StyledMultiSelect
            name="theme"
            placeholder="Kies een thema"
            options={theme}
            onChange={(values: string) => {
              updateFilter("theme", values);
            }}
          />
          <Label label="Stadsdeel" />
          <StyledMultiSelect
            name="area"
            placeholder="Kies een standsdeel"
            options={area}
            onChange={(values: string) => {
              updateFilter("area", values);
            }}
          />
        </SyledColumn>

        <SyledColumn>
          <Label label="Niveau" />
          <StyledMultiSelect
            placeholder="Kies een niveau"
            name="level"
            options={level}
            onChange={(values: string) => {
              updateFilter("level", values);
            }}
          />
          <Label label="Type" />
          <StyledMultiSelect
            placeholder="Kies een type"
            name="type"
            options={type}
            onChange={(values: string) => {
              updateFilter("type", values);
            }}
          />
          <Label label="Filter op tekst" />
          <Input
            type="text"
            id="query"
            onChange={(e: any) => {
              updateFilter("query", e.target.value);
            }}
          />
        </SyledColumn>

        <Button variant="secondary" data-testid="reset" onClick={resetFilter}>
          Wis filter
        </Button>
      </form>
    </StyledDiv>
  );
};

export default Filter;
