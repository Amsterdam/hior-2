import { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { Button, Input, Label, themeSpacing } from "@amsterdam/asc-ui";
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
    state: { groups, filteredItems, filter },
    //@ts-ignore
    dispatch,
    //@ts-ignore
  } = useContext(FilterContext);

  const [source, setSource] = useState<any[]>([]);
  const [level, setLevel] = useState<any[]>([]);
  const [theme, setTheme] = useState<any[]>([]);
  const [type, setType] = useState<any[]>([]);
  const [area, setArea] = useState<any[]>(defaultArea);

  const updateFilter = useCallback(
    (group = "", values = []) => {
      let value: any = null;

      if (group && values) {
        value = values.map((item: any) => item.value).join("|");
      }

      let newFilter = {
        ...filter,
      };

      if ((group && value) || value === "") {
        newFilter = {
          ...filter,
          [group]: value,
        };
      }

      dispatch(actions.setFilter(newFilter));
    },
    [filter, dispatch],
  );

  const formatGroup = useCallback(
    (group: string) => {
      return (
        groups[group]
          .map((option: string) => {
            // Get the count first
            const count = filteredItems?.filter((item: any) => (item[group] as string).includes(option)).length;

            return {
              count,
              option,
            };
          })
          // Filter items with count = 0 because we can't use them as filter option.
          .filter(({ count }: { count: number }) => count > 0)
          // Convert to label, value object
          .map(({ option, count }: { option: string; count: number }) => {
            return { label: `${option} (${count})`, value: option };
          })
      );
    },
    [groups, filteredItems],
  );

  useEffect(() => {
    updateFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            options={formatGroup("type")}
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
            options={formatGroup("theme")}
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
            options={formatGroup("level")}
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
            options={formatGroup("area")}
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
            options={formatGroup("source")}
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
