// Import dependencies
import React from "react";
import styled from "styled-components"

const StyledButton = styled.button`
    outline: none;
    border: none;
    cursor: pointer;
    display: inline;
    justify-content: center;
    border-radius: 5px;
    background-color: rgb(245, 245, 245, 0.7);
    width: auto;
    padding: 4px 8px;
    margin-left: 1px;
    margin-right: 1px;
    margin-top: 0;
    margin-bottom: 0;
  &:hover {
    background-position: right center;
    background-color: rgb(245, 245, 245);
  }
`;
const StyledText = styled.p`
    font-size: 16px;
    font-weight: 400;
    margin: 0;
    color: rgb(72,72,72);
    @media only screen and (max-width: 768px) {
        font-size: 12px;
    }
`;
function Keyword({ text, url }) {
    return (
        <StyledButton onClick={() => { window.open(url, '_blank') }} >
            <StyledText>{text}</StyledText>
        </StyledButton >
    );
}

export default Keyword;
