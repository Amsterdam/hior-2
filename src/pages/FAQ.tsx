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
        <StyledHeading>Veelgestelde vragen</StyledHeading>~{" "}
        <StyledAccordion id="a1" title="Wat is het HIOR Amsterdam?">
          <Paragraph gutterBottom={0}>
            Het Handboek Inrichting Openbare Ruimte Amsterdam (HIOR Amsterdam) is een digitaal platform waarop al het
            bestaande beleid voor de inrichting van de Amsterdamse openbare ruimte op hoofdlijnen is samengevat. Met het
            HIOR Amsterdam worden meer dan 30 beleidsproducten integraal ontsloten. Het HIOR Amsterdam heeft op zichzelf
            géén bestuurlijke status. De bestuurlijke status is verbonden aan de achterliggende beleidsdocumenten.
          </Paragraph>
        </StyledAccordion>
        <StyledAccordion id="a2" title="Hoe actueel is het HIOR Amsterdam?">
          <Paragraph gutterBottom={0}>
            Het HIOR Amsterdam wordt geactualiseerd zodra er nieuw beleid wordt vastgesteld door het college van B&amp;W
            of de Gemeenteraad. Onderaan de pagina kun je zien op welke datum de laatste update plaatsgevonden heeft.
          </Paragraph>
        </StyledAccordion>
        <StyledAccordion id="a3" title="Hoe gebruik ik het HIOR Amsterdam?">
          <Paragraph gutterBottom={0}>
            In het HIOR Amsterdam gebruik je om Amsterdams beleid voor de openbare ruimte te vinden. Bijvoorbeeld op
            basis van een thema (bijvoorbeeld fiets, auto, groen, sport &amp; spel, etc.) of aan de hand van een
            beleidsproduct (bijvoorbeeld de Visie Openbare Ruimte of het Beleidskader Verkeernsnetten).
            <br />
            <br />
            Met filters kun je vervolgens aangeven op welk niveau je beleidsinformatie wilt inzien (strategisch,
            tachtisch, operationeel en/of proces) en welk type informatie je wilt inzien (randvoorwaarden,
            uitgangspunten, ambities en/of adviezen).
            <br />
            <br />
            Het HIOR Amsterdam bevat de hoofdlijnen van het beleid dat geldt voor de hele stad en ook gebieddspecifieke
            aspecten. Ook daarop kun je filteren, door te kiezen voor &quot;Heel Amsterdam&quot; of één van de
            stadsdelen.
          </Paragraph>
        </StyledAccordion>
      </StyledDiv>
    </>
  );
};

export default FAQ;
