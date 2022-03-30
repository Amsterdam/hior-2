import { useEffect } from "react";
import styled from "styled-components";
import { Accordion, Column, Heading, Paragraph, Row, themeSpacing } from "@amsterdam/asc-ui";
import useDataFetching from "../hooks/useDataFetching";
import { HIOR_FAQ_URL } from "../constants";

const StyledDiv = styled.div`
  margin-top: ${themeSpacing(10)};
  width: 100%;
`;

const StyledHeading = styled(Heading)`
  margin-bottom: ${themeSpacing(5)};
`;

const StyledAccordion = styled(Accordion)`
  margin-top: ${themeSpacing(3)};
`;

const StyledParagraph = styled(Paragraph)`
  white-space: pre-wrap;
`;

const FAQ = () => {
  const { results, fetchData } = useDataFetching();

  useEffect(() => {
    fetchData(HIOR_FAQ_URL);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div data-testid="faq">
      <Row>
        <Column span={10}>
          <StyledDiv>
            <StyledHeading>Veelgestelde vragen</StyledHeading>
            {/* @ts-ignore */}
            {results && results.results && results.results.map((faq: any) => (
                <StyledAccordion key={faq.id} id={`a${faq.id}`} title={faq.question}>
                  <StyledParagraph gutterBottom={0}>{faq.answer}</StyledParagraph>
                </StyledAccordion>
              ))}
          </StyledDiv>
        </Column>
      </Row>
    </div>
  );
};

export default FAQ;
