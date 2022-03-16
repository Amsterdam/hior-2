import styled from "styled-components";
import { Accordion, Heading, Paragraph, themeSpacing } from "@amsterdam/asc-ui";

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

const FAQ = () => {
  return (
    <>
      <StyledDiv data-testid="faq">
        <StyledHeading>Veelgestelde vragen</StyledHeading>

        <StyledAccordion id="a1" title="Wat is het HIOR Amsterdam?">
          <Paragraph gutterBottom={0}>
            Het Handboek Inrichting Openbare Ruimte Amsterdam (HIOR Amsterdam) is een digitaal platform waarop al het
            bestaande beleid voor de inrichting van de Amsterdamse openbare ruimte op hoofdlijnen is samengevat. Met het
            HIOR Amsterdam worden meer dan 30 beleidsproducten integraal ontsloten. Het HIOR Amsterdam heeft op zichzelf
            géén bestuurlijke status. De bestuurlijke status is verbonden aan de achterliggende beleidsdocumenten.
          </Paragraph>
        </StyledAccordion>
      </StyledDiv>
    </>
  );
};

export default FAQ;
