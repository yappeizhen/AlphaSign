// Import dependencies
import React from "react";
import styled from "styled-components";

const Bubble = styled.div`
  position: relative;
  background: ${(prop) => prop.backgroundColor};
  border-radius: 0.4em;
  width: 100%;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 10%;
    width: 0;
    height: 0;
    border: 32px solid transparent;
    border-top-color: ${(props) => props.backgroundColor};
    border-bottom: 0;
    border-right: 0;
    margin-left: 16px;
    margin-bottom: -32px;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: auto;
    padding: 20px;
  }
`;
function TextBubble({ children, backgroundColor = "rgb(196, 180, 328, 0.5)" }) {
  return <Bubble backgroundColor={backgroundColor}>{children}</Bubble>;
}

export default TextBubble;
