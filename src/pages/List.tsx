import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
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
import axios from "axios";
import useFilter from "../hooks/useFilter";
import { HIOR_ITEMS_URL, HIOR_PROPERTIES_URL, HIOR_ATTRIBUTES_URL } from "../constants";
import GroupSelector from "../components/GroupSelector";
import { FilterContext } from "../filter/FilterContext";
import Loader from "../components/Loader";
import Filter from "../components/Filter";
import { ItemEnriched, Group, Property, Attribute } from "../types";
import useEnrichItems from "../hooks/useEnrichItems";
import { actions } from "../filter/reducer";
import { ALL_GROUPS } from "../constants";
import useFetch from "../hooks/useFetch";

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
  const [properties, setProperties] = useState<Property[] | undefined>();
  const [attributes, setAttributes] = useState<Attribute[] | undefined>();
  const { data, loading, get } = useFetch();

  const {
    //@ts-ignore
    state: { filter, group, groups },
    //@ts-ignore
    dispatch,
  } = useContext(FilterContext);

  const getProperties = useCallback(async () => {
    const props = await axios.get(HIOR_PROPERTIES_URL);
    setProperties(props.data.results);
  }, []);

  const getAttributes = useCallback(async () => {
    const attr = await axios.get(HIOR_ATTRIBUTES_URL);
    setAttributes(attr.data.results);
  }, []);

  useEffect(() => {
    get(HIOR_ITEMS_URL);
    getProperties();
    getAttributes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!filteredItems) return;
    dispatch(actions.setFilteredItems(filteredItems));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributes, properties, filter]);

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
        return null;
      }
      return <span></span>;
    },
    [group],
  );

  const { enrichedItems, allGroups } = useEnrichItems(data?.results, properties, attributes);

  useEffect(() => {
    if (!allGroups) return;
    dispatch(actions.setGroups(allGroups));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allGroups]);

  const filteredItems = useFilter(filter, enrichedItems);

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
            {(loading || !attributes || !properties) && <Loader />}
            {!loading &&
              attributes &&
              properties &&
              groups[group].map((g: Group) => {
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
