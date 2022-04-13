import styled from "styled-components";
import { Column, Row, Select, TextField, themeSpacing } from "@amsterdam/asc-ui";
import { useContext } from "react";
import { FilterContext } from "../filter/FilterContext";
import { actions } from "../filter/reducer";

const StyledDiv = styled.div`
  margin-top: ${themeSpacing(10)};
  margin-bottom: ${themeSpacing(10)};
  width: 100%;
`;

//@ts-ignore
const Filter = ({ groups }) => {
  const {
    //@ts-ignore
    state: { filter },
    //@ts-ignore
    dispatch,
    //@ts-ignore
  } = useContext(FilterContext);

  const updateFilter = (e: any) => {
    const newFilter = {
      source: e.target.form.source.value,
      level: e.target.form.level.value,
      theme: e.target.form.theme.value,
      type: e.target.form.type.value,
      area: e.target.form.area.value,
      query: e.target.form.query.value,
    };

    //@ts-ignore
    dispatch(actions.setFilter(newFilter));
  };

  return (
    <StyledDiv data-testid="filter">
      <form>
        <Row>
          <Column span={6}>
            <div>
              <Select id="source" label="Bron" onChange={updateFilter}>
                <option value="">Kies een bron</option>
                {groups.source.map((option: string) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
              <Select id="theme" label="Thema" onChange={updateFilter}>
                <option value="">Kies een bron</option>
                {groups.theme.map((option: string) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
              <Select id="area" label="Stadsdeel" onChange={updateFilter}>
                <option value="">Kies een standsdeel</option>
                {groups.area.map((option: string) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </div>
          </Column>

          <Column span={6}>
            <div>
              <Select id="level" label="Niveau" onChange={updateFilter}>
                <option value="">Kies een niveau</option>
                {groups.level.map((option: string) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
              <Select id="type" label="Type" onChange={updateFilter}>
                <option value="">Kies een type</option>
                {groups.type.map((option: string) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>

              <TextField id="query" label="Filter op tekst" onChange={updateFilter} />
            </div>
          </Column>
        </Row>
      </form>
    </StyledDiv>
  );
};

export default Filter;
