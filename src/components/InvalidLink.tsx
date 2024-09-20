import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MessageContainer = styled.div`
  position: fixed; 
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", "sans-serif";
  font-size: 24px;
  font-weight: 600;
`;

const SadFace = styled.span`
  font-size: 1.5em;
  margin-right: 5px;
`;

const InvalidLink = () => {
  return (
    <MessageContainer>
      <p>Whoops! It seems you have reached an invalid link. <SadFace>😞</SadFace></p>
      <p>
        Click <Link to="/">here</Link> to return to the home page.
      </p>
    </MessageContainer>
  );
};

export default InvalidLink;
