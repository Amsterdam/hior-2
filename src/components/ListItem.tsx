import styled from "styled-components";
import { Accordion, Link, TableBody, TableCell, TableRow, themeSpacing, Table } from "@amsterdam/asc-ui";
import { Document, Image, ItemEnriched } from "../types";
import { useState } from "react";

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

const ItemWrapper = styled("div")`
  table {
    font-size: 1rem;
  }

  td,
  a {
    font-size: 1rem;
  }
`;

const ListItem = ({ item }: { item: ItemEnriched }) => {
  const [open, setOpen] = useState(false);

  return (
    <ItemWrapper data-testid={`item-${item.id}`}>
      <StyledAccordion
        id={`${item.id}`}
        key={item.id}
        title={`${item.id} ${item.text}`}
        onToggle={(open) => setOpen(open)}
      >
        {open && (
          <>
            <StyledParagraph>{item.description}</StyledParagraph>
            {item?.images?.map((image: Image) => (
              <StyledImg src={image.src} key={`${item.id}-${image.id}`} alt={image.alt}></StyledImg>
            ))}
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>{item.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Stadsdeel</TableCell>
                  <TableCell>{item.area}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Thema</TableCell>
                  <TableCell>{item.theme}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bron</TableCell>
                  <TableCell>
                    {item.documents.map((document: Document) => (
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
                {!!item.links?.length && (
                  <TableRow>
                    <TableCell>Achtergrondinformatie</TableCell>
                    <TableCell>
                      {item.links.map((document: Document) => (
                        <Link key={`${item.id}-${document.id}`} variant="inline" target="_blank" href={document.src}>
                          {document.name}
                        </Link>
                      ))}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </>
        )}
      </StyledAccordion>
    </ItemWrapper>
  );
};

export default ListItem;
