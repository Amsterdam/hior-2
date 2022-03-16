import styled from "styled-components";
import {
  Accordion,
  Column,
  Heading,
  Paragraph,
  Row,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  themeSpacing
} from "@amsterdam/asc-ui";

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

const StyledImg = styled.img`
  width: 100%;
  height: -moz-fit-content;
  height: fit-content;
  margin-bottom: 20px;
`;

const StyledTablecell = styled(TableCell)`
  vertical-align: top;
`;

const Home = () => {
  return (
    <>
      <Row data-testid="home">
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
          <StyledDiv>
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
              <Paragraph gutterBottom={0}>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <StyledTablecell style={{verticalAlign: 'top'}}>Strategisch</StyledTablecell>
                        <StyledTablecell>
                          Dit beleid is strategisch, gericht op het bereiken van een overkoepelend doel. Het geeft
                          richting aan de ontwikkeling van de stad en komt vaak voort uit visies, programma’s en
                          agenda&rsquo;s.
                        </StyledTablecell>
                      </TableRow>
                      <TableRow>
                        <StyledTablecell>Tactisch</StyledTablecell>
                        <StyledTablecell>Dit beleid geeft op tactisch niveau aan wat er nodig is voor een goede, functionele en duurzame openbare ruimte. Het is een uitwerking van bovenliggend strategisch beleid.</StyledTablecell>
                      </TableRow>
                      <TableRow>
                        <StyledTablecell>Operationeel</StyledTablecell>
                        <StyledTablecell>Dit beleid geeft op operationeel niveau aan hoe de openbare ruimte exact moet worden ontworpen, ingericht of aangelegd.</StyledTablecell>
                      </TableRow>
                      <TableRow>
                        <StyledTablecell>Proces</StyledTablecell>
                        <StyledTablecell>Dit zijn procesafspraken die bijdragen aan een betere samenwerking en uiteindelijk een beter eindresultaat in de openbare ruimte.</StyledTablecell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paragraph>
            </StyledAccordion>
            <StyledAccordion id="a2" title="Type">
              <Paragraph gutterBottom={0}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad delectus hic incidunt iure labore natus
                odio pariatur qui sint, voluptas!
              </Paragraph>
            </StyledAccordion>
          </StyledDiv>
        </Column>
      </Row>
    </>
  );
};

export default Home;
