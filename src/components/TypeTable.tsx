import styled from "styled-components";
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@amsterdam/asc-ui";

const StyledTablecell = styled(TableCell)`
  vertical-align: top;
`;

const TypeTable = () => {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <StyledTablecell>Strategisch</StyledTablecell>
            <StyledTablecell>
              Dit beleid is strategisch, gericht op het bereiken van een overkoepelend doel. Het geeft richting aan de
              ontwikkeling van de stad en komt vaak voort uit visies, programma&rsquo;s en agenda&rsquo;s.
            </StyledTablecell>
          </TableRow>
          <TableRow>
            <StyledTablecell>Tactisch</StyledTablecell>
            <StyledTablecell>
              Dit beleid geeft op tactisch niveau aan wat er nodig is voor een goede, functionele en duurzame openbare
              ruimte. Het is een uitwerking van bovenliggend strategisch beleid.
            </StyledTablecell>
          </TableRow>
          <TableRow>
            <StyledTablecell>Operationeel</StyledTablecell>
            <StyledTablecell>
              Dit beleid geeft op operationeel niveau aan hoe de openbare ruimte exact moet worden ontworpen, ingericht
              of aangelegd.
            </StyledTablecell>
          </TableRow>
          <TableRow>
            <StyledTablecell>Proces</StyledTablecell>
            <StyledTablecell>
              Dit zijn procesafspraken die bijdragen aan een betere samenwerking en uiteindelijk een beter eindresultaat
              in de openbare ruimte.
            </StyledTablecell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TypeTable;
