// Import dependencies
import React from "react";
import styled from "styled-components"

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-family: "Poppins";
    padding: 12px 0;
    width: 100%;
    background-color: rgb(240, 248, 255, 0.5);
`;
const StyledLogo = styled.img`
    width: 160px;
    @media only screen and (max-width: 768px) {
        width: 100px;
    }
`;
const StyledText = styled.div`
    margin-right: 12px;
    @media only screen and (max-width: 768px) {
        font-size: 12px;
    }
`;
function Footer() {
    return (
        <>
            <StyledContainer>
                <StyledText>Powered by:</StyledText>
                <StyledLogo src="tensorflow-js-logo-social.png" alt="tfjs-logo" />
            </StyledContainer>
        </>
    );
}

export default Footer;
