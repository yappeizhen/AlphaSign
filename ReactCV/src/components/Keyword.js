// Import dependencies
import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  cursor: pointer;
  display: inline;
  justify-content: center;
  border-radius: 5px;
  background-color: rgb(260, 260, 260, 0.5);
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  width: auto;
  padding: 4px 8px;
  margin: 0;
  &:hover {
    background-position: right center;
    background-color: rgb(245, 245, 245);
  }
`;
const StyledText = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  color: rgb(80, 80, 80);
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
function Keyword({ text, url }) {
  return (
    <StyledButton
      onClick={() => {
        window.open(url, "_blank");
      }}
    >
      <StyledText>{text}</StyledText>
    </StyledButton>
  );
}

export default Keyword;
