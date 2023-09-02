// Import dependencies
import React from "react";
import styled from "styled-components";

const Bubble = styled.div`
  position: relative;
  background: rgba(124, 185, 231, 0.7);
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
    border-top-color: rgba(124, 185, 231, 0.7);
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
function TextBubble({ children }) {
  return <Bubble>{children}</Bubble>;
}

export default TextBubble;
