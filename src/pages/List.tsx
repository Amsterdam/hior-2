import styled from "styled-components";
import { breakpoint, Column, Row, themeSpacing } from "@amsterdam/asc-ui";
import orderBy from "lodash/orderBy";

import GroupSelector from "../components/GroupSelector";
import { useGroupState } from "../filter/FilterContext";
import Loader from "../components/Loader";
import Filter from "../components/Filter";
import ResultGroupTitle from "../components/ResultGroupTitle";
import ListItem from "../components/ListItem";
import useFilteredItems from "../hooks/useFilteredItems";

const ListWrapper = styled("div")`
  @media screen and ${breakpoint("min-width", "tabletS")} {
    margin-top: ${themeSpacing(5)};
  }
  width: 100%;
`;

const Heading = styled("h2")`
  margin-bottom: ${themeSpacing(5)};
`;

const List = () => {
  const { group } = useGroupState();
  const { filteredItems, groups, isLoading, filter } = useFilteredItems();

  // TODO: why does 1 search item not show up in results on Theme page? (Is because a nested lookup is needed to decide if we show or no)
  // TODO: als er maar 1 groep keuze is deze niet meer tonen

  return (
    <Row>
      <Column span={12}>
        <ListWrapper data-testid="list">
          <Filter />

          <Heading data-testid="list-results">Resultaten ({filteredItems?.length})</Heading>

          <GroupSelector />

          {isLoading && <Loader />}
          {!isLoading && (
            <div>
              {groups[group].map((g) => {
                const items = orderBy(
                  filteredItems?.filter((j) => j[group].includes(g)),
                  group === "theme" ? ["themeSortKey"] : ["sortKey"],
                  ["asc"],
                );

                return (
                  <section key={g}>
                    <ResultGroupTitle title={g} count={items?.length || 0} group={group} />

                    {items?.map((item) => (
                      <ListItem item={item} key={item.id} searchTerm={filter?.query} />
                    ))}
                  </section>
                );
              })}
            </div>
          )}
        </ListWrapper>
      </Column>
    </Row>
  );
};

export default List;
