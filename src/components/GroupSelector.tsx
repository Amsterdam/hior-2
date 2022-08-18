import { useCallback, MouseEvent } from "react";
import styled from "styled-components";
import { Link, Tabs, Tab, themeSpacing } from "@amsterdam/asc-ui";
import { useDispatch, useFilterState } from "../filter/FilterContext";
import { actions } from "../filter/reducer";
import { Group, Selector } from "../types";
import { ALL_GROUPS } from "../constants";
import useFilteredItems from "../hooks/useFilteredItems";

const Wrapper = styled("div")`
  margin-top: ${themeSpacing(8)};
  width: 100%;
`;

const TabContent = styled("div")`
  padding-top: ${themeSpacing(2)};
  margin-bottom: ${themeSpacing(6)};
`;

const ItemWrapper = styled("span")`
  padding-left: ${themeSpacing(1)};
  padding-right: ${themeSpacing(1)};

  &:first-child {
    padding-left: 0px;
  }
`;

const GroupItem = ({ value, group }: { value: string; group: Group }) => {
  const { filteredItems } = useFilteredItems();
  const count = filteredItems?.filter((item) => item[group] === value).length;

  if (count > 0) {
    return (
      <ItemWrapper>
        <Link href={`#${value.replace(" ", "-")}`} variant="inline">
          {value} ({count})
        </Link>
        &nbsp;&nbsp;
      </ItemWrapper>
    );
  }

  return null;
};

const GroupSelector = () => {
  const { group } = useFilterState();
  const { groups } = useFilteredItems();

  const dispatch = useDispatch();

  const onClickGroup = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      dispatch(actions.setGroup(e.currentTarget.getAttribute("data-value") || ""));
    },
    [dispatch],
  );

  return (
    <Wrapper data-testid="group-selector">
      <Tabs label="" activeTab={group}>
        {ALL_GROUPS.map((b: Selector) => (
          <Tab
            key={b.value}
            data-testid={`button-${b.value}`}
            id={b.value}
            data-value={b.value}
            label={b.label}
            onClick={onClickGroup}
          >
            <TabContent>
              {groups[b.value].map((value, index) => (
                <GroupItem key={index} value={value} group={b.value} />
              ))}
            </TabContent>
          </Tab>
        ))}
      </Tabs>
    </Wrapper>
  );
};

export default GroupSelector;
