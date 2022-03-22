import { useEffect } from "react";
import styled from "styled-components";
import { Accordion, Column, Heading, Paragraph, Row, themeSpacing } from "@amsterdam/asc-ui";
import useDataFetching from "../hooks/useDataFetching";
import { API_URL } from "../constants";

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
  const { results, fetchData } = useDataFetching();

  useEffect(() => {
    fetchData(API_URL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("data", results);

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
