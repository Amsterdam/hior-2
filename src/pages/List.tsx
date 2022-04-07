import { useCallback, useContext, useEffect, useState } from "react";
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
import useDataFetching from "../hooks/useDataFetching";
import { IMAGE_URL, HIOR_ITEMS_URL, HIOR_PROPERTIES_URL, HIOR_ATTRIBUTES_URL, DOCUMENT_URL } from "../constants";
import { getByUri } from "../services/api";
import GroupSelector from "../components/GroupSelector";
import { FilterContext } from "../filter/FilterContext";

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

// const StyledButton = styled(Button)`
//   margin-right: ${themeSpacing(3)};
// `;

const List = () => {
  const [properties, setProperties] = useState<any[] | null>(null);
  const [attributes, setAttributes] = useState<any[] | null>(null);
  // const [sources, setSources] = useState<any[] | null>(null);
  // const [levels, setLevels] = useState<any[] | null>(null);
  // const [themes, setThemes] = useState<any[] | null>(null);
  // const [types, setTypes] = useState<any[] | null>(null);
  const [groups, setGroups] = useState<any>({
    source: [],
    level: [],
    theme: [],
    type: [],
  });
  const [allItems, setAllItems] = useState<any[]>([]);
  const { results, fetchData } = useDataFetching();

  // const groups = {
  //   source: [],
  //   level: [],
  //   theme: [],
  //   type: [],
  // };

  // const allGroups = [
  //   {
  //     value: "source",
  //     label: "Bron",
  //   },
  //   {
  //     value: "level",
  //     label: "Niveau",
  //   },
  //   {
  //     value: "theme",
  //     label: "Thema",
  //   },
  //   {
  //     value: "type",
  //     label: "Type",
  //   },
  // ];
  // eslint-disable-next-line no-console
  console.log("allItems", allItems);

  const {
    //@ts-ignore
    state: { filter, sort, group },
    //@ts-ignore
    dispatch,
  } = useContext(FilterContext);
  // eslint-disable-next-line no-console
  console.log("context", filter, sort, group);

  const getProperties = useCallback(async () => {
    const props = await getByUri(HIOR_PROPERTIES_URL);
    setProperties(props.data.results);
  }, []);

  const getAttributes = useCallback(async () => {
    const attr = await getByUri(HIOR_ATTRIBUTES_URL);
    setAttributes(attr.data.results);
  }, []);

  useEffect(() => {
    fetchData(HIOR_ITEMS_URL);
    getProperties();
    getAttributes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("group", group);
  }, [group]);

  useEffect(() => {
    if (!results || !properties || !attributes) {
      return;
    }

    const foundGroups = {
      source: [],
      level: [],
      theme: [],
      type: [],
    };
    // enrich items with properties and attributes
    // @ts-ignore
    const items = results.results.map((i: any) => {
      const foundProps = properties.filter((a: any) => i.id === a.item_id);
      const newAttr = {};
      foundProps.map((attr: any) => {
        // @ts-ignore
        newAttr[attr.name.toLowerCase()] = attr.value;
      });
      const foundAttr = attributes.filter((a: any) => i.id === a.item_id);

      // @ts-ignore
      const images = [];
      foundAttr.forEach((a: any) => {
        if (a.name === "Image") {
          images.push({
            id: a.id,
            src: `${IMAGE_URL}${a.value}`,
            alt: a.value,
          });
        }
      });

      // @ts-ignore
      const documents = [];
      foundAttr.forEach((a: any) => {
        if (a.name === "SourceLink") {
          documents.push({
            id: a.id,
            src: `${DOCUMENT_URL}${a.value}.pdf`,
            name: a.value,
          });
        }
      });

      // @ts-ignore
      if (!foundGroups.source.includes(newAttr.source)) foundGroups.source.push(newAttr.source);
      // @ts-ignore
      if (!foundGroups.level.includes(newAttr.level)) foundGroups.level.push(newAttr.level);
      // @ts-ignoren
      if (!foundGroups.theme.includes(newAttr.theme)) foundGroups.theme.push(newAttr.theme);
      // @ts-ignore
      if (!foundGroups.type.includes(newAttr.type)) foundGroups.type.push(newAttr.type);

      return {
        ...i,
        ...newAttr,
        //@ts-ignore
        images,
        //@ts-ignore
        documents,
      };
    });

    // sort alphabettically
    const sorted = items.sort((a: any, b: any) => {
      if (a.text < b.text) {
        return -1;
      }
      if (a.text > b.text) {
        return 1;
      }
      return 0;
    });

    setAllItems(sorted);

    setGroups(foundGroups);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, properties, attributes]);
  console.log("render", groups);

  return (
    <StyledDiv data-testid="list">
      <Row>
        <Column span={12}>
          <LargeDiv>
            <StyledHeading>Resultaten</StyledHeading>
            <br />
            <br />
            <GroupSelector groups={groups} />
            {group}

            <br />
            <br />
            {allItems.map((item: any) => (
              <StyledAccordion id={`a${item.id}`} key={item.id} title={`${item.id} ${item.text}`}>
                <StyledParagraph>{item.description}</StyledParagraph>

                {item?.images?.map((image: any) => (
                  <StyledImg src={image.src} key={`${item.id}-${image.id}`} alt={image.alt}></StyledImg>
                ))}

                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Bron</TableCell>
                      <TableCell>{item.source}</TableCell>
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
                    <TableRow>
                      <TableCell>Documenten</TableCell>
                      <TableCell>
                        {item.documents.map((document: any) => (
                          <Link key={`${item.id}-${document.id}`} variant="inline" target="_blank" href={document.src}>
                            {document.name}.pdf
                          </Link>
                        ))}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </StyledAccordion>
            ))}
          </LargeDiv>
        </Column>
      </Row>
    </StyledDiv>
  );
};

export default List;
