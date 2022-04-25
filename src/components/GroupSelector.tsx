import styled from "styled-components";
import { Tabs, Tab, themeSpacing } from "@amsterdam/asc-ui";
import { useContext, useCallback } from "react";
import { FilterContext } from "../filter/FilterContext";
import { actions } from "../filter/reducer";
import { Selector } from "../types";
import { getCount } from "../services/utils";
import { ALL_GROUPS } from "../constants";

const StyledDiv = styled.div`
  margin-top: ${themeSpacing(10)};
  width: 100%;
`;

const StyledTab = styled(Tab)`
  width: 100%;
  padding-top: ${themeSpacing(2)};
  margin-bottom: ${themeSpacing(6)};
`;

const GroupSelector = () => {
  const {
    //@ts-ignore
    state: { group, groups, filteredItems },
    //@ts-ignore
    dispatch,
    //@ts-ignore
  } = useContext(FilterContext);

  const onClickGroup = useCallback(
    (e: any) => {
      e.preventDefault();
      dispatch(actions.setGroup(e.target.getAttribute("data-value")));
    },
    [dispatch],
  );

  return (
    <StyledDiv data-testid="group-selector">
      <Tabs label="" activeTab={group}>
        {ALL_GROUPS.map((b: Selector) => (
          <StyledTab
            key={b.value}
            data-testid={`button-${b.value}`}
            id={b.value}
            data-value={b.value}
            label={b.label}
            onClick={onClickGroup}
          >
            {/* @ts-ignore */}
            {groups[b.value].map((group) => (
              <span key={group}>
                {group} ({getCount(filteredItems, b.value, group)}),{" "}
              </span>
            ))}
          </StyledTab>
        ))}
      </Tabs>
    </StyledDiv>
  );
};

export default GroupSelector;
