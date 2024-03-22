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
  background-color: white;
  padding: 20px;
`;

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode
  triggerRef: React.RefObject<HTMLButtonElement>; // Reference to the trigger button
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children, triggerRef }) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!triggerRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [show, onClose, triggerRef]);

  if (!show) return null;

  const triggerRect = triggerRef.current?.getBoundingClientRect();

  if (!triggerRect) return null;

  const modalStyle: React.CSSProperties = {
    top: `${triggerRect.bottom}px`,
    left: `${triggerRect.left}px`,
  };

  return (
    <ModalOverlay>
      <ModalContent style={modalStyle}>
        {/* Close button */}
        <button onClick={onClose}>Close</button>
        {/* Modal content */}
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

// Make sure to replace "modal-root" with the ID of the root element where you want to render your modal in your index.html file
