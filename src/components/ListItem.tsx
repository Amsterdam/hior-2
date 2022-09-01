import { useState } from "react";
import styled from "styled-components";
import { Accordion, Link, TableBody, TableCell, TableRow, themeSpacing, Table } from "@amsterdam/asc-ui";
import { Document, Image, ItemEnriched } from "../types";
import Modal, { ModalProps } from "./Modal";

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

interface ImageViewerProps extends Omit<ModalProps, "children"> {
  image: Image | null;
}

const ImageViewer = ({ image, ...props }: ImageViewerProps) => {
  return (
    image && (
      <Modal {...props}>
        <img style={{ width: "100%" }} src={image.src} alt={image.alt}></img>
      </Modal>
    )
  );
};

const ListItem = ({ item }: { item: ItemEnriched }) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<Image | null>(null);
  const [showModal, setShowModal] = useState(false);

  const showImageModal = (image: Image) => {
    setImage(image);
    setShowModal(true);
  };

  return (
    <ItemWrapper data-testid={`item-${item.id}`}>
      <StyledAccordion id={`${item.id}`} key={item.id} title={item.text} onToggle={(open) => setOpen(open)}>
        {open && (
          <>
            <StyledParagraph>{item.description}</StyledParagraph>
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
