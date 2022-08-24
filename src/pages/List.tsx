import styled from "styled-components";
import { Column, Row, themeSpacing } from "@amsterdam/asc-ui";

import GroupSelector from "../components/GroupSelector";
import { useGroupState } from "../filter/FilterContext";
import Loader from "../components/Loader";
import Filter from "../components/Filter";
import ResultGroupTitle from "../components/ResultGroupTitle";
import ListItem from "../components/ListItem";
import useFilteredItems from "../hooks/useFilteredItems";

const StyledDiv = styled("div")`
  margin-top: ${themeSpacing(5)};
  width: 100%;
`;

const Heading = styled("h2")`
  margin-bottom: ${themeSpacing(5)};
`;

const List = () => {
  const { group } = useGroupState();
  const { filteredItems, groups, isLoading } = useFilteredItems();

  // TODO: sortering van items
  // TODO: why does 1 search item not show up in results on Theme page?
  // TODO: als er maar 1 groep keuze is deze niet meer tonen

  return (
    <Row>
      <Column span={12}>
        <StyledDiv data-testid="list">
          <Filter />

          <Heading>Resultaten ({filteredItems?.length})</Heading>

          <GroupSelector />

          {isLoading && <Loader />}
          {!isLoading && (
            <div>
              {groups[group].map((g) => {
                const items = filteredItems?.filter((j: any) => g === j[group]);

                return (
                  <section key={g}>
                    <ResultGroupTitle title={g} count={items?.length || 0} group={group} />

                    {items?.map((item) => (
                      <ListItem item={item} key={item.id} />
                    ))}
                  </section>
                );
              })}
            </div>
          )}
        </StyledDiv>
      </Column>
    </Row>
  );
};

export default List;
