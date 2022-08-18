import styled from "styled-components";
import { Accordion, Link, TableBody, TableCell, TableRow, themeSpacing, Table } from "@amsterdam/asc-ui";
import { ItemEnriched } from "../types";

const StyledAccordion = styled(Accordion)`
  margin-top: ${themeSpacing(3)};
`;

const StyledImg = styled("img")`
  width: 250px;
  margin: ${themeSpacing(0, 4, 4, 0)};
`;

const StyledParagraph = styled("p")`
  white-space: pre-wrap;
`;

const ListItem = ({ item }: { item: ItemEnriched }) => {
  // TODO: Checklist uitwerken
  return (
    <StyledAccordion id={`${item.id}`} key={item.id} title={`${item.id} ${item.text}`}>
      <StyledParagraph>{item.description}</StyledParagraph>
      {item?.images?.map((image: any) => (
        <StyledImg src={image.src} key={`${item.id}-${image.id}`} alt={image.alt}></StyledImg>
      ))}
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Bron</TableCell>
            <TableCell>
              {item.documents.map((document: any) => (
                <Link key={`${item.id}-${document.id}`} variant="inline" target="_blank" href={document.src}>
                  {document.name}
                </Link>
              ))}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Niveau</TableCell>
            <TableCell>{item.level}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Thema</TableCell>
            <TableCell>{item.theme}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>{item.type}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Stadsdeel</TableCell>
            <TableCell>{item.area}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      checklist hier
    </StyledAccordion>
  );
};

export default ListItem;
