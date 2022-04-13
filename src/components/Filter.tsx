import styled from "styled-components";
import { Column, Row, Select, themeSpacing } from "@amsterdam/asc-ui";
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
    };

    //@ts-ignore
    dispatch(actions.setFilter(newFilter));

    console.log("updateFilter click", e.target.form.level.value);
  };
  console.log("updateFilter groups", groups);

  return (
    <StyledDiv data-testid="filter">
      <form>
        <Row>
          <Column span={6}>
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
          </Column>

          <Column span={6}>
            <Select id="level" label="Niveau" onChange={updateFilter}>
              <option value="">Kies een niveau</option>
              {groups.level.map((option: string) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            <Select id="type" label="Type" onChange={updateFilter}>
              <option value="">Kies een niveau</option>
              {groups.type.map((option: string) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Column>
        </Row>
      </form>
    </StyledDiv>
  );
};

export default Filter;
