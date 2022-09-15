import { useState } from "react";
import styled from "styled-components";
import { Link, TableBody, TableCell, TableRow, themeSpacing, Table, themeColor } from "@amsterdam/asc-ui";
import { Document, Image, ItemEnriched } from "../types";
import Accordion from "./Accordion";
import ImageViewer from "./ImageViewer";

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

  .filterText {
    color: ${themeColor("secondary")};
  }
`;

function filteredText(text: string, filterText: string) {
  const addSpan = (match: string, p1: string) => {
    if (p1 && p1.startsWith("href=")) {
      return match;
    }
    return `<span class="filterText">${match}</span>`;
  };
  return filterText ? text.replace(RegExp(`(href=[\\S]*)|(${filterText})`, "ig"), addSpan) : text;
}

const ListItem = ({ item, searchTerm }: { item: ItemEnriched; searchTerm: string | undefined }) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<Image | null>(null);
  const [showModal, setShowModal] = useState(false);

  const showImageModal = (image: Image) => {
    setImage(image);
    setShowModal(true);
  };

  return (
    <ItemWrapper data-testid={`item-${item.id}`}>
      <StyledAccordion
        id={`${item.id}`}
        key={item.id}
        title={item.text}
        HTMLTitle={<span dangerouslySetInnerHTML={{ __html: filteredText(item.text, searchTerm || "") }}></span>}
        onToggle={(open) => setOpen(open)}
      >
        {open && (
          <>
            <StyledParagraph
              dangerouslySetInnerHTML={{ __html: filteredText(item.description, searchTerm || "") }}
            ></StyledParagraph>
            {item?.images?.map((image: Image) => (
              <StyledImg
                src={image.src}
                key={`${item.id}-${image.id}`}
                alt={image.alt}
                onClick={() => {
                  showImageModal(image);
                }}
              ></StyledImg>
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

            <ImageViewer image={image} showModal={showModal} setShowModal={setShowModal} />
          </>
        )}
      </StyledAccordion>
    </ItemWrapper>
  );
};

export default ListItem;
