// Import dependencies
import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.4);
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: auto;
  background: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  background-size: 150% auto;
  &:hover {
    background-position: right center;
  }
`;
const StyledText = styled.p`
  font-size: 14px;
  font-weight: 600;
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
function DSButton({ text, onClick, visible = true }) {
  return (
    <StyledButton onClick={onClick} visible={visible} color="black">
      <StyledText>{text}</StyledText>
    </StyledButton>
  );
}

export default DSButton;
