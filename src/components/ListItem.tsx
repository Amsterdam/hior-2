import styled from "styled-components";
import { Accordion, Link, TableBody, TableCell, TableRow, themeSpacing } from "@amsterdam/asc-ui";
import { ItemEnriched } from "../types";
import { Table } from "@amsterdam/asc-assets";

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
      {/* <table>
        <tbody>
          <tr>
            <td>Bron</td>
            <td>
              {item.documents.map((document: any) => (
                <Link key={`${item.id}-${document.id}`} variant="inline" target="_blank" href={document.src}>
                  {document.name}
                </Link>
              ))}
            </td>
          </tr>
          <tr>
            <td>Niveau</td>
            <td>{item.level}</td>
          </tr>
          <tr>
            <td>Thema</td>
            <td>{item.theme}</td>
          </tr>
          <tr>
            <td>Type</td>
            <td>{item.type}</td>
          </tr>
          <tr>
            <td>Stadsdeel</td>
            <td>{item.area}</td>
          </tr>
        </tbody>
      </table> */}
      checklist hier
    </StyledAccordion>
  );
};

export default ListItem;
