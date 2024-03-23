import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { API_URL, Colors, ScreenSizes } from "../constants";
import LikersComponent from "./LikersComponent";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5); /* Semi-transparent black background */
  z-index: 1000;
  overflow: auto; /* Add this line */
`;

const ModalContent = styled.div`
  position: fixed;
  width: 30%; /* Remove fixed width */
  max-height: 50vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${Colors.blue_3};
  border-radius: 20px;
  border: 2px solid ${Colors.dark_grey};
  box-shadow: 4px 4px 0 ${Colors.green_2},
    4px 4px 0 2px ${Colors.dark_grey};  
  padding: 20px;
  z-index: 1001; /* Ensure the modal content is above the overlay */
  display: flex; /* Set display to flex */
  flex-direction: column; /* Stack items vertically */
  overflow-y: auto; /* Add vertical scrolling */
  scrollbar-width: thin;
  scrollbar-color: transparent transparent; /* Thumb and track color */
`;


type LikersType = {
    Id: string;
    Username: string;
  };

const Title = styled.span`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 1.875em;
  margin-bottom: 10px;
`;

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  likers: LikersType[];
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children, likers }) => {

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
        <Title>List of Likers: </Title>
        {likers ? likers.map((liker) => (
            <LikersComponent likerId={liker.Id} likerUsername={liker.Username}/>
        )) : null
        }
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

// Make sure to replace "modal-root" with the ID of the root element where you want to render your modal in your index.html file
