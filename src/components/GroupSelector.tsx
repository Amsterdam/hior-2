import { useCallback } from "react";
import styled from "styled-components";
import { Link, Tabs, Tab, themeSpacing } from "@amsterdam/asc-ui";
import { useDispatch, useFilterState } from "../filter/FilterContext";
import { actions } from "../filter/reducer";
import { Group, Selector } from "../types";
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

const GroupItem = ({ value, group, index }: { value: string; group: Group; index: number }) => {
  const { filteredItems } = useFilterState();
  const count = filteredItems?.filter((item: any) => item[group] === value).length;

  if (count > 0) {
    return (
      <span>
        <Link href={`#${value.replace(" ", "-")}`} variant="inline">
          {value} ({count}){count - 1 !== index && count > 1 ? "," : ""}
        </Link>
        &nbsp;&nbsp;
      </span>
    );
  }
  return <span></span>;
};

const GroupSelector = () => {
  const { group, groups } = useFilterState();

  const dispatch = useDispatch();

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
            {groups[b.value].map((value: string, index) => (
              <span key={value}>
                <GroupItem value={value} group={b.value} index={index} />
              </span>
            ))}
          </StyledTab>
        ))}
      </Tabs>
    </StyledDiv>
  );
};

export default GroupSelector;
