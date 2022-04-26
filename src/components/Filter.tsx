import { useCallback, useContext, useState } from "react";
import "react-multiple-select-dropdown-lite/dist/index.css";
import styled from "styled-components";
import { Button, Input, Label, themeSpacing } from "@amsterdam/asc-ui";
//@ts-ignore
import MultiSelect from "react-multiple-select-dropdown-lite";
import { FilterContext } from "../filter/FilterContext";
import { actions, initialState } from "../filter/reducer";
import { getCount } from "../services/utils";

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
            options={groups.source.map((option: string) => ({
              label: `${option} (${getCount(filteredItems, "source", option)})`,
              value: option,
            }))}
            onChange={(values: string) => {
              updateFilter("source", values);
            }}
          />
          <Label label="Thema" />
          <StyledMultiSelect
            name="theme"
            placeholder="Kies een thema"
            options={groups.theme.map((option: string) => ({
              label: `${option} (${getCount(filteredItems, "theme", option)})`,
              value: option,
            }))}
            onChange={(values: string) => {
              updateFilter("theme", values);
            }}
          />
          <Label label="Stadsdeel" />
          <StyledMultiSelect
            name="area"
            placeholder="Kies een standsdeel"
            options={groups.area.map((option: string) => ({
              label: `${option} (${getCount(filteredItems, "area", option)})`,
              value: option,
            }))}
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
            options={groups.level.map((option: string) => ({
              label: `${option} (${getCount(filteredItems, "level", option)})`,
              value: option,
            }))}
            onChange={(values: string) => {
              updateFilter("level", values);
            }}
          />
          <Label label="Type" />
          <StyledMultiSelect
            placeholder="Kies een type"
            name="type"
            options={groups.type.map((option: string) => ({
              label: `${option} (${getCount(filteredItems, "type", option)})`,
              value: option,
            }))}
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
