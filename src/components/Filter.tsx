import { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Input, Label, themeSpacing } from "@amsterdam/asc-ui";
import Select from "react-select";
import { FilterContext } from "../filter/FilterContext";
import { actions, initialState, defaultArea } from "../filter/reducer";

const StyledDiv = styled.div`
  margin-bottom: ${themeSpacing(10)};
  width: 100%;

  label {
    margin-top: ${themeSpacing(3)};
    font-weight: bold;
  }
`;

const StyledMultiSelect = styled(Select)`
  width: 100%;
`;

const SyledColumn = styled.div`
  width: calc(50% - ${themeSpacing(5)});
  margin-right: ${themeSpacing(5)};
  float: left;
`;

const Filter = () => {
  const {
    //@ts-ignore
    state: { groups /* filteredItems */ },
    //@ts-ignore
    dispatch,
    //@ts-ignore
  } = useContext(FilterContext);

  const [sources, setSoures] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [themes, setThemes] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>([]);

  const [source, setSource] = useState<any[]>([]);
  const [level, setLevel] = useState<any[]>([]);
  const [theme, setTheme] = useState<any[]>([]);
  const [type, setType] = useState<any[]>([]);
  const [area, setArea] = useState<any[]>(defaultArea);

  const [filter, setFilter] = useState<any>({
    source: "",
    level: "",
    theme: "",
    type: "",
    area: defaultArea[0].value,
    query: "",
  });

  const updateFilter = useCallback(
    (group = "", values = null) => {
      let value: any = null;

      if (group && values && values.map) {
        value = values.map((item: any) => item.value).join("|");
      }

      let newFilter = {
        ...filter,
      };

      if (group && value|| value === "")  {
        newFilter = {
          ...filter,
          [group]: value,
        };
      }

      setFilter(newFilter);

      dispatch(actions.setFilter(newFilter));
    },
    [filter, dispatch],
  );

  const formatGroup = useCallback(
    (group: string) => {
      return groups[group].map((option: string) => {
        return { label: option, value: option };
      });
    },
    [groups],
  );

  useEffect(() => {
    setSoures(formatGroup("source"));
    setLevels(formatGroup("level"));
    setThemes(formatGroup("theme"));
    setTypes(formatGroup("type"));
    setAreas(formatGroup("area"));

    updateFilter();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups]);

  const resetFilter = useCallback(() => {
    dispatch(actions.setFilter(initialState.filter));
  }, [dispatch]);

  return (
    <StyledDiv data-testid="filter">
      <form>
        <SyledColumn>
          <Label label="Type" />
          <StyledMultiSelect
            placeholder="Kies een type"
            name="type"
            isMulti
            defaultValue={type}
            options={types}
            onChange={(values: any) => {
              setType(values);
              updateFilter("type", values);
            }}
          />
          <Label label="Thema" />
          <StyledMultiSelect
            name="theme"
            placeholder="Kies een thema"
            isMulti
            defaultValue={theme}
            options={themes}
            onChange={(values: any) => {
              setTheme(values);
              updateFilter("theme", values);
            }}
          />

          <Label label="Niveau" />
          <StyledMultiSelect
            placeholder="Kies een niveau"
            isMulti
            defaultValue={level}
            name="level"
            options={levels}
            onChange={(values: any) => {
              setLevel(values);
              updateFilter("level", values);
            }}
          />
        </SyledColumn>
        <SyledColumn>
          <Label label="Algemeen beleid (Heel Amsterdam) of aanvullend beleid per stadsdeel?" />
          <StyledMultiSelect
            name="area"
            placeholder="Kies een standsdeel"
            isMulti
            defaultValue={area}
            options={areas}
            onChange={(values: any) => {
              setArea(values);
              updateFilter("area", values);
            }}
          />
          <Label label="Bron" />
          <StyledMultiSelect
            name="source"
            placeholder="Kies een bron"
            isMulti
            defaultValue={source}
            options={sources}
            onChange={(values: any) => {
              setSource(values);
              updateFilter("source", values);
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
