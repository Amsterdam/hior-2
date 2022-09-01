import { Image } from "../types";
import Modal, { ModalProps } from "./Modal";

interface ImageViewerProps extends Omit<ModalProps, "children"> {
  image: Image | null;
}

export default function ImageViewer({ image, ...props }: ImageViewerProps) {
  return (
    image && (
      <Modal {...props}>
        <img style={{ width: "100%" }} src={image.src} alt={image.alt}></img>
      </Modal>
    )
  );
}
