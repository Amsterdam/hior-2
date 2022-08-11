import { ReactNode, useCallback, useEffect } from "react";
import styled from "styled-components";
import {
  Accordion,
  Column,
  Heading,
  Link,
  Paragraph,
  Row,
  Table,
  TableBody,
  TableCell,
  TableRow,
  themeSpacing,
} from "@amsterdam/asc-ui";
import useFilter from "../hooks/useFilter";
import GroupSelector from "../components/GroupSelector";
import { useDispatch, useFilterState } from "../filter/FilterContext";
import Loader from "../components/Loader";
import Filter from "../components/Filter";
import { ItemEnriched } from "../types";
import useEnrichItems from "../hooks/useEnrichItems";
import { actions } from "../filter/reducer";
import { ALL_GROUPS } from "../constants";
import { useFetchAttributes } from "../hooks/useFetchAttributes";
import { useFetchProperties } from "../hooks/useFetchProperties";
import { useFetchItems } from "../hooks/useFetchItems";

const StyledDiv = styled.div`
  margin-top: ${themeSpacing(10)};
  width: 100%;
`;

const StyledHeading = styled(Heading)`
  margin-bottom: ${themeSpacing(5)};
`;

const LargeDiv = styled.div`
  width: 100%;
`;

const StyledAccordion = styled(Accordion)`
  margin-top: ${themeSpacing(3)};
`;

const StyledImg = styled.img`
  width: 250px;
  margin: ${themeSpacing(0, 4, 4, 0)};
`;

const StyledParagraph = styled(Paragraph)`
  white-space: pre-wrap;
`;

const StyledTitle = styled(Paragraph)`
  margin-top: ${themeSpacing(9)};
  font-weight: bold;
`;

const StyledIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 16px;
`;

const List = () => {
  const { data: properties, isLoading: isLoadingProps } = useFetchProperties();
  const { data: attributes, isLoading: isLoadingAttrs } = useFetchAttributes();
  const { data: items, isLoading: isLoadingItems } = useFetchItems();
  const dispatch = useDispatch();

  const loading = isLoadingProps || isLoadingAttrs || isLoadingItems;

  const { filter, group, groups } = useFilterState();

  useEffect(() => {
    if (!filteredItems) return;
    dispatch(actions.setFilteredItems(filteredItems));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributes?.results, properties?.results, filter]);

  const renderTitle = useCallback(
    (title: string, count: number): ReactNode => {
      if (count > 0) {
        const label = ALL_GROUPS.find((item) => item.value === group)?.label;
        const image = title.replace(/\d+\d*\. */g, "");
        return (
          <StyledTitle id={title.replace(" ", "-")}>
            {group === "theme" && <StyledIcon src={`icons/${image}.png`} alt={title}></StyledIcon>} {label}: {title} (
            {count})
          </StyledTitle>
        );
      }
      return <span></span>;
    },
    [group],
  );

  const { enrichedItems, allGroups } = useEnrichItems(items?.results, properties?.results, attributes?.results);
  const filteredItems = useFilter(filter, enrichedItems);

  useEffect(() => {
    if (!allGroups) return;
    dispatch(actions.setGroups(allGroups));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allGroups]);

  return (
    <StyledDiv data-testid="list">
      <Row>
        <Column span={12}>
          <LargeDiv>
            <Filter />

            <StyledHeading>Resultaten ({filteredItems?.length})</StyledHeading>

            <GroupSelector />

            <br />
            <br />
            {loading && <Loader />}
            {!loading &&
              attributes &&
              properties &&
              groups[group].map((g) => {
                const part = filteredItems?.filter((j: any) => g === j[group]);

                return (
                  <span key={g}>
                    {renderTitle(g, part?.length)}

                    {part?.map((item: ItemEnriched) => (
                      <StyledAccordion id={`a${item.id}`} key={item.id} title={`${item.id} ${item.text}`}>
                        <StyledParagraph>{item.description}</StyledParagraph>
                        {item?.images?.map((image: any) => (
                          <StyledImg src={image.src} key={`${item.id}-${image.id}`} alt={image.alt}></StyledImg>
                        ))}
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell>Bron</TableCell>
                              <TableCell>
                                {item.documents.map((document: any) => (
                                  <Link
                                    key={`${item.id}-${document.id}`}
                                    variant="inline"
                                    target="_blank"
                                    href={document.src}
                                  >
                                    {document.name}
                                  </Link>
                                ))}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Niveau</TableCell>
                              <TableCell>{item.level}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Thema</TableCell>
                              <TableCell>{item.theme}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Type</TableCell>
                              <TableCell>{item.type}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Stadsdeel</TableCell>
                              <TableCell>{item.area}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                        checklist hier
                      </StyledAccordion>
                    ))}
                  </span>
                );
              })}
          </LargeDiv>
        </Column>
      </Row>
    </StyledDiv>
  );
};

export default List;
