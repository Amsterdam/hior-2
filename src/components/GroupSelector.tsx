import { useCallback, MouseEvent } from "react";
import styled from "styled-components";
import { Link, Tabs, Tab, themeSpacing } from "@amsterdam/asc-ui";
import { useGroupState } from "../filter/FilterContext";
import { Group, ItemEnriched, Selector } from "../types";
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

const GroupItem = ({ value, group, filteredItems }: { value: string; group: Group; filteredItems: ItemEnriched[] }) => {
  const count = filteredItems?.filter((item) => item[group].includes(value)).length;

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
  const { group, setGroup } = useGroupState();
  const { groups, filteredItems } = useFilteredItems();

  const onClickGroup = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setGroup((e.currentTarget.getAttribute("data-value") || "") as Group);
    },
    [setGroup],
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
                <GroupItem key={index} value={value} group={b.value} filteredItems={filteredItems} />
              ))}
            </TabContent>
          </Tab>
        ))}
      </Tabs>
    </Wrapper>
  );
};

export default GroupSelector;
