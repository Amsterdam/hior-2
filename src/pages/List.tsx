import styled from "styled-components";
import { Accordion, Column, Heading, Paragraph, Row, themeSpacing } from "@amsterdam/asc-ui";

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

// const StyledAccordion = styled(Accordion)`
//   margin-top: ${themeSpacing(3)};
// `;

const List = () => {
  return (
    <StyledDiv>
      <Row data-testid="list">
        <Column span={12}>
          <LargeDiv>
            <StyledHeading>Resultaten</StyledHeading>
            <br />
            <br />
            <Accordion id="a1" title="Niveau">
              <Paragraph gutterBottom={0}>yio</Paragraph>
            </Accordion>
          </LargeDiv>
        </Column>
      </Row>
    </StyledDiv>
  );
};

export default List;
