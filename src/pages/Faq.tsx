import styled from "styled-components";
import { Accordion, Column, Heading, Paragraph, Row, themeSpacing } from "@amsterdam/asc-ui";
import Loader from "../components/Loader";
import { useFetchFaq } from "../hooks/useFetchFaq";

const StyledDiv = styled("div")`
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
  font-size: 1rem;
`;

const Faq = () => {
  const { data, isLoading: loading } = useFetchFaq();

  return (
    <div data-testid="faq">
      <Row>
        <Column span={10}>
          <StyledDiv>
            <StyledHeading>Veelgestelde vragen</StyledHeading>

            {loading && <Loader />}

            {!loading &&
              data?.results?.map((faq) => (
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

export default Faq;
