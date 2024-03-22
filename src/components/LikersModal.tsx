// LikersModal.tsx

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
`;

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const modalNode = document.getElementById("modal-content");

      if (modalNode && !modalNode.contains(event.target as Node)) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [show, onClose]);

  if (!show) return null;

  return(
    <ModalOverlay>
      <ModalContent id="modal-content">
        {/* Modal content */}
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

// Make sure to replace "modal-root" with the ID of the root element where you want to render your modal in your index.html file
