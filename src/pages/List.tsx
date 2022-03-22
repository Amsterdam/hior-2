import { useEffect, useState } from "react";
import styled from "styled-components";
import { Accordion, Column, Heading, Paragraph, Row, themeSpacing } from "@amsterdam/asc-ui";
import useDataFetching from "../hooks/useDataFetching";
import { HIOR_ITEMS_URL, HIOR_PROPERTIES_URL } from "../constants";
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
  const [attributes, setAttributes] = useState<any[]>([]);
  const [allItems, setAllItems] = useState<any[]>([]);
  const { results, fetchData } = useDataFetching();
  console.log("allItems", allItems);

  const getAttributes = async () => {
    const attrs = await getByUri(HIOR_PROPERTIES_URL);
    setAttributes(attrs);
  };

  // const data = results;
  useEffect(() => {
    fetchData(HIOR_ITEMS_URL);
    getAttributes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!results || !attributes) {
      return;
    }

    // @ts-ignore
    const items = results.results.map((i) => {
      // @ts-ignore
      const found = attributes.results.filter((a) => i.id === a.item_id);
      const newAttr = {};
      // @ts-ignore
      found.map((attr) => {
        // @ts-ignore
        newAttr[attr.name.toLowerCase()] = attr.value;
      });

      return {
        ...i,
        ...newAttr,
      };
    });

    setAllItems(items);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, attributes]);

  // const filteredData = data;

  return (
    <StyledDiv>
      <Row data-testid="list">
        <Column span={12}>
          <LargeDiv>
            <StyledHeading>Resultaten</StyledHeading>
            <br />
            <br />
            <StyledAccordion id="a1" title="Niveau">
              <Paragraph gutterBottom={0}>yio</Paragraph>
            </StyledAccordion>
          </LargeDiv>
        </Column>
      </Row>
    </StyledDiv>
  );
};

export default List;
