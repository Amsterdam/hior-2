import styled from "styled-components";
import { Button, themeSpacing } from "@amsterdam/asc-ui";
import { useContext } from "react";
import { FilterContext } from "../filter/FilterContext";
import { actions } from "../filter/reducer";

const StyledDiv = styled.div`
  margin-top: ${themeSpacing(10)};
  width: 100%;
`;

const StyledButton = styled(Button)`
  margin-right: ${themeSpacing(3)};
`;

const GroupSelector = () => {
  const {
    //@ts-ignore
    dispatch,
  } = useContext(FilterContext);

  const allGroups = [
    {
      value: "source",
      label: "Bron",
    },
    {
      value: "level",
      label: "Niveau",
    },
    {
      value: "theme",
      label: "Thema",
    },
    {
      value: "type",
      label: "Type",
    },
  ];

  const onClickGroup = (e:  React.MouseEvent<HTMLButtonElement>) => {
    //@ts-ignore
    dispatch(actions.setGroup(e.target.value));
  };

  return (
    <StyledDiv data-testid="group-selector">
      {allGroups.map((b: any) => (
        <>
          {/* @ts-ignore */}
          <StyledButton key={b.value} value={b.value} variant="primary" onClick={onClickGroup}>
            {b.label}
          </StyledButton>
        </>
      ))}
    </StyledDiv>
  );
};

export default GroupSelector;
