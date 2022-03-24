import { useEffect, useState } from "react";
import styled from "styled-components";
import { Accordion, Column, Heading, Paragraph, Row, themeSpacing } from "@amsterdam/asc-ui";
import useDataFetching from "../hooks/useDataFetching";
import { IMAGE_URL, HIOR_ITEMS_URL, HIOR_PROPERTIES_URL, HIOR_ATTRIBUTES_URL } from "../constants";
import { getByUri } from "../services/api";
// import { Apicall } from "../types";

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

const List = () => {
  const [properties, setProperties] = useState<any[] | null>(null);
  const [attributes, setAttributes] = useState<any[] | null>(null);
  const [allItems, setAllItems] = useState<any[]>([]);
  const { results, fetchData } = useDataFetching();
  console.log("allItems", allItems);
  null;

  const getProperties = async () => {
    const props = await getByUri(HIOR_PROPERTIES_URL);
    setProperties(props.results);
  };

  const getAttributes = async () => {
    const attr = await getByUri(HIOR_ATTRIBUTES_URL);
    setAttributes(attr.results);
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
            src: `${IMAGE_URL}${a.value}`,
            alt: a.value,
          });
        }
      });

      return {
        ...i,
        ...newAttr,
        //@ts-ignore
        images,
      };
    });

    setAllItems(items);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, properties, attributes]);

  return (
    <StyledDiv>
      <Row data-testid="list">
        <Column span={12}>
          <LargeDiv>
            <StyledHeading>Resultaten</StyledHeading>
            <br />
            <br />
            {allItems.map((item: any) => (
              <StyledAccordion id={`a${item.id}`} key={item.id} title={item._display}>
                <Paragraph>{item.description}</Paragraph>

                {item?.images?.map((image: any) => (
                  <img src={image.src} key={image.src} alt={image.alt}></img>
                ))}
              </StyledAccordion>
            ))}
          </LargeDiv>
        </Column>
      </Row>
    </StyledDiv>
  );
};

export default List;
