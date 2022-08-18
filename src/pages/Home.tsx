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
  themeSpacing,
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
    <Row data-testid="home">
      <Column span={2}>
        <div style={{ marginTop: "50px" }}>
          <StyledImg src="images/intro1.jpg" alt="test" />
          <StyledImg src="images/intro2.jpg" alt="test" />
          <StyledImg src="images/intro3.jpg" alt="test" />
          <StyledImg src="images/intro4.jpg" alt="test" />
          <StyledImg src="images/intro5.jpg" alt="test" />
        </div>
      </Column>

      <Column span={10}>
        <StyledDiv>
          <StyledHeading>Startpagina</StyledHeading>
          In dit digitale handboek vind je de hoofdlijnen van het beleid voor de inrichting van de Amsterdamse openbare
          ruimte. Dit handboek is samengesteld op basis van verschillende bestaande beleidsstukken. Het handboek is een
          hulpmiddel om het beleid beter vindbaar en bruikbaar te maken.
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
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <StyledTablecell>Strategisch</StyledTablecell>
                    <StyledTablecell>
                      Dit beleid is strategisch, gericht op het bereiken van een overkoepelend doel. Het geeft richting
                      aan de ontwikkeling van de stad en komt vaak voort uit visies, programma’s en agenda&rsquo;s.
                    </StyledTablecell>
                  </TableRow>
                  <TableRow>
                    <StyledTablecell>Tactisch</StyledTablecell>
                    <StyledTablecell>
                      Dit beleid geeft op tactisch niveau aan wat er nodig is voor een goede, functionele en duurzame
                      openbare ruimte. Het is een uitwerking van bovenliggend strategisch beleid.
                    </StyledTablecell>
                  </TableRow>
                  <TableRow>
                    <StyledTablecell>Operationeel</StyledTablecell>
                    <StyledTablecell>
                      Dit beleid geeft op operationeel niveau aan hoe de openbare ruimte exact moet worden ontworpen,
                      ingericht of aangelegd.
                    </StyledTablecell>
                  </TableRow>
                  <TableRow>
                    <StyledTablecell>Proces</StyledTablecell>
                    <StyledTablecell>
                      Dit zijn procesafspraken die bijdragen aan een betere samenwerking en uiteindelijk een beter
                      eindresultaat in de openbare ruimte.
                    </StyledTablecell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </StyledAccordion>
          <StyledAccordion id="a2" title="Type">
            <Paragraph>Hiermee wordt aangegeven hoe het beleid getypeerd wordt:</Paragraph>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <StyledTablecell>Randvoorwaarde</StyledTablecell>
                    <StyledTablecell>
                      De openbare ruimte wordt conform deze bestuurlijk vastgestelde randvoorwaarden ingericht. Afwijken
                      is alleen mogelijk als daar door het bestuur expliciet toe besloten wordt.
                    </StyledTablecell>
                  </TableRow>
                  <TableRow>
                    <StyledTablecell>Uitgangspunt</StyledTablecell>
                    <StyledTablecell>
                      Deze uitgangspunten komen voort uit vastgesteld beleid. Ze vormen de basis voor de inrichting van
                      de Amsterdamse openbare ruimte. Uitgangspunten bieden veelal ruimte voor diverse invullingen op
                      projectniveau. Soms kan onderbouwd van de uitgangspunten worden afgeweken, in afstemming met de
                      opstellers van het beleid en het bestuur.
                    </StyledTablecell>
                  </TableRow>
                  <TableRow>
                    <StyledTablecell>Ambitie</StyledTablecell>
                    <StyledTablecell>
                      De door de gemeenteraad, het college of het stadsdeelbestuur vastgestelde ambities worden
                      meegenomen bij het inrichten van de openbare ruimte. Niet alle ambities zijn binnen één straat,
                      park of plein te realiseren. Op projectniveau worden hierin keuzes gemaakt.
                    </StyledTablecell>
                  </TableRow>
                  <TableRow>
                    <StyledTablecell>Advies</StyledTablecell>
                    <StyledTablecell>
                      Dit zijn zwaarwegende adviezen die volgen uit richtlijnen, handleidingen, handboeken, etc. die
                      geen bestuurlijke status (meer) hebben. De adviezen zijn wel van belang zijn voor een goede
                      inrichting van de openbare ruimte. Als er geen invulling aan het advies gegeven kan worden, wordt
                      dit afgestemd met de betrokken ambtenaren of voorgelegd aan de daarvoor bestemde adviesorganen,
                      zoals de Centrale Verkeerscommissie.
                    </StyledTablecell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </StyledAccordion>
        </StyledDiv>
      </Column>
    </Row>
  );
};

export default Home;
