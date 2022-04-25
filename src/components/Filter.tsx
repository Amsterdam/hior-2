import "react-multiple-select-dropdown-lite/dist/index.css";
import styled from "styled-components";
import { Button, Column, Input, Label, Row, themeSpacing } from "@amsterdam/asc-ui";
//@ts-ignore
import MultiSelect from "react-multiple-select-dropdown-lite";
import { useContext, useState } from "react";
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

const Filter = () => {
  const {
    //@ts-ignore
    state: { groups, filteredItems },
    //@ts-ignore
    dispatch,
    //@ts-ignore
  } = useContext(FilterContext);

  const [allGroups, setGroups] = useState<any>({
    source: "",
    level: "",
    theme: "",
    type: "",
    area: "",
    query: "",
  });

  const updateFilter = (group: string, values: string) => {
    const newFilter = {
      ...allGroups,
      [group]: values,
    };

    setGroups(newFilter);

    dispatch(actions.setFilter(newFilter));
  };

  const resetFilter = () => {
    dispatch(actions.setFilter(initialState.filter));
  };

  return (
    <StyledDiv data-testid="filter">
      <form>
        <Row>
          <Column span={6}>
            <div>
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
            </div>
          </Column>

          <Column span={6}>
            <div>
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
            </div>
          </Column>
        </Row>
        <Button variant="secondary" data-testid="reset" onClick={resetFilter}>
          Wis filter
        </Button>
      </form>
    </StyledDiv>
  );
};

export default Filter;
