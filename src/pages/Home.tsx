import styled from "styled-components";
import { Accordion, breakpoint, Column, Heading, Paragraph, Row, themeSpacing } from "@amsterdam/asc-ui";
import TypeTable from "../components/TypeTable";
import PolicyTable from "../components/PolicyTable";

const ColumnContent = styled("div")`
  margin-top: ${themeSpacing(5)};
  width: 100%;

  @media screen and ${breakpoint("min-width", "tabletS")} {
    margin-top: ${themeSpacing(10)};
  }
`;

const ColumnImages = styled(ColumnContent)`
  grid-area: images;
`;

const ColumnTables = styled(ColumnContent)`
  grid-area: main;
  width: 100%;

  @media screen and ${breakpoint("min-width", "tabletS")} {
    margin-left: ${themeSpacing(11)};
    width: calc(100% - ${themeSpacing(11)});
  }
`;

const StyledHeading = styled(Heading)`
  margin-bottom: ${themeSpacing(5)};
`;

const StyledAccordion = styled(Accordion)`
  margin-top: ${themeSpacing(3)};
`;

const StyledImg = styled("img")`
  width: 100%;
  height: fit-content;
  margin-bottom: 20px;
`;

const HomeWrapper = styled("div")`
  display: grid;
  grid-template-rows: [main] auto [images] auto;
  grid-template-columns: none;

  @media screen and ${breakpoint("min-width", "tabletS")} {
    grid-template-columns: [images] 17% [main] 83%;
    grid-template-rows: none;
  }
`;

const Home = () => {
  return (
    <Row data-testid="home">
      <Column span={12}>
        <HomeWrapper>
          <ColumnImages>
            <StyledImg src="images/intro1.jpg" alt="" />
            <StyledImg src="images/intro2.jpg" alt="" />
            <StyledImg src="images/intro3.jpg" alt="" />
            <StyledImg src="images/intro4.jpg" alt="" />
            <StyledImg src="images/intro5.jpg" alt="" />
          </ColumnImages>

          <ColumnTables>
            <StyledHeading>Startpagina</StyledHeading>
            In dit digitale handboek vind je de hoofdlijnen van het beleid voor de inrichting van de Amsterdamse
            openbare ruimte. Dit handboek is samengesteld op basis van verschillende bestaande beleidsstukken. Het
            handboek is een hulpmiddel om het beleid beter vindbaar en bruikbaar te maken.
            <br />
            <br />
            Het beleid is makkelijk te doorzoeken op thema (bijvoorbeeld &rsquo;fiets&rsquo;, &rsquo;groen&rsquo; of
            &rsquo;straatmeubilair&rsquo;) of per beleidsproduct (bijvoorbeeld de &rsquo;Visie Openbare Ruimte&rsquo; of
            de &rsquo;Nota Parkeernormen&rsquo;).
            <br />
            <br />
            Om het beleid te ordenen zijn kenmerken toegevoegd, die hieronder worden toegelicht.
            <br />
            <br />
            <StyledAccordion id="a1" title="Niveau">
              <TypeTable />
            </StyledAccordion>
            <StyledAccordion id="a2" title="Type">
              <Paragraph>Hiermee wordt aangegeven hoe het beleid getypeerd wordt:</Paragraph>
              <PolicyTable />
            </StyledAccordion>
          </ColumnTables>
        </HomeWrapper>
      </Column>
    </Row>
  );
};

export default Home;
