import { Table, TableBody, TableCell, TableContainer, TableRow } from "@amsterdam/asc-ui";
import styled from "styled-components";

const StyledTablecell = styled(TableCell)`
  vertical-align: top;
`;

const PolicyTable = () => {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <StyledTablecell>Randvoorwaarde</StyledTablecell>
            <StyledTablecell>
              De openbare ruimte wordt conform deze bestuurlijk vastgestelde randvoorwaarden ingericht. Afwijken is
              alleen mogelijk als daar door het bestuur expliciet toe besloten wordt.
            </StyledTablecell>
          </TableRow>
          <TableRow>
            <StyledTablecell>Uitgangspunt</StyledTablecell>
            <StyledTablecell>
              Deze uitgangspunten komen voort uit vastgesteld beleid. Ze vormen de basis voor de inrichting van de
              Amsterdamse openbare ruimte. Uitgangspunten bieden veelal ruimte voor diverse invullingen op
              projectniveau. Soms kan onderbouwd van de uitgangspunten worden afgeweken, in afstemming met de opstellers
              van het beleid en het bestuur.
            </StyledTablecell>
          </TableRow>
          <TableRow>
            <StyledTablecell>Ambitie</StyledTablecell>
            <StyledTablecell>
              De door de gemeenteraad, het college of het stadsdeelbestuur vastgestelde ambities worden meegenomen bij
              het inrichten van de openbare ruimte. Niet alle ambities zijn binnen één straat, park of plein te
              realiseren. Op projectniveau worden hierin keuzes gemaakt.
            </StyledTablecell>
          </TableRow>
          <TableRow>
            <StyledTablecell>Advies</StyledTablecell>
            <StyledTablecell>
              Dit zijn zwaarwegende adviezen die volgen uit richtlijnen, handleidingen, handboeken, etc. die geen
              bestuurlijke status (meer) hebben. De adviezen zijn wel van belang zijn voor een goede inrichting van de
              openbare ruimte. Als er geen invulling aan het advies gegeven kan worden, wordt dit afgestemd met de
              betrokken ambtenaren of voorgelegd aan de daarvoor bestemde adviesorganen, zoals de Centrale
              Verkeerscommissie.
            </StyledTablecell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PolicyTable;
