import styled from "styled-components";
import { Column, Heading, Row, themeSpacing } from "@amsterdam/asc-ui";

const StyledDiv = styled.div`
  margin-top: ${themeSpacing(10)};
  width: 100%;
`;

const StyledHeading = styled(Heading)`
  margin-bottom: ${themeSpacing(5)};
`;

const StyledImg = styled.img`
  width: 100%;
  height: -moz-fit-content;
  height: fit-content;
  margin-bottom: 20px;
`;

const Home = () => {
  return (
    <>
      <Row>
        <Column span={2}>
          <div style={{ marginTop: "50px" }}>
            <StyledImg src="intro1.jpg" alt="test" />
            <StyledImg src="intro2.jpg" alt="test" />
            <StyledImg src="intro3.jpg" alt="test" />
            <StyledImg src="intro4.jpg" alt="test" />
            <StyledImg src="intro5.jpg" alt="test" />
          </div>
        </Column>

        <Column span={10}>
          <StyledDiv data-testid="home">
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
          </StyledDiv>
        </Column>
      </Row>
    </>
  );
};

export default Home;
