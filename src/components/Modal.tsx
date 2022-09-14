import React from "react";
import styled from "styled-components";
import { Modal as ASCModal, themeSpacing } from "@amsterdam/asc-ui";

const ModalContent = styled.div`
  padding: ${themeSpacing(3)};
`;

const StyledAscModal = styled(ASCModal)`
  max-width: 80%;
`;

export type ModalProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  children: React.ReactNode;
};

const Modal = ({ showModal, setShowModal, children }: ModalProps) => {
  return (
    <StyledAscModal disablePortal open={showModal} backdropOpacity={0.3} onClose={() => setShowModal(false)}>
      <ModalContent>{children}</ModalContent>
    </StyledAscModal>
  );
};

export default Modal;
