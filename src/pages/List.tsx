import { useContext, useEffect, useState } from "react";
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

const List = () => {
  const [properties, setProperties] = useState<any[] | null>(null);
  const [attributes, setAttributes] = useState<any[] | null>(null);
  const [allItems, setAllItems] = useState<any[]>([]);
  const { results, fetchData } = useDataFetching();
  // eslint-disable-next-line no-console
  console.log("allItems", allItems);

  const {
    //@ts-ignore 
    state: { filter , sort }
  } = useContext(FilterContext);
  console.log('context', filter, sort);
  

  const getProperties = async () => {
    const props = await getByUri(HIOR_PROPERTIES_URL);
    setProperties(props.data.results);
  };

  const getAttributes = async () => {
    const attr = await getByUri(HIOR_ATTRIBUTES_URL);
    setAttributes(attr.data.results);
  };

  // const data = results;
  useEffect(() => {
    fetchData(HIOR_ITEMS_URL);
    getProperties();
    getAttributes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!results || !properties || !attributes) {
      return;
    }

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

      return {
        ...i,
        ...newAttr,
        //@ts-ignore
        images,
        //@ts-ignore
        documents,
      };
    });

    setAllItems(items);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, properties, attributes]);

  return (
    <StyledDiv data-testid="list">
      <Row>
        <Column span={12}>
          <LargeDiv>
            <StyledHeading>Resultaten</StyledHeading>
            <br />
            <br />
            {allItems.map((item: any) => (
              <StyledAccordion id={`a${item.id}`} key={item.id} title={item.text}>
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
