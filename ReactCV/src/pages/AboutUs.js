import "../App.css";

// Import dependencies
import React from "react";
import styled from "styled-components"

// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";

// Styled Components
const StyledWrapper = styled.div`
  color: rgb(40, 44, 52);
  background-size: cover;
  height: auto;
`;
const StyledAppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: poppins;
  align-items: center;
  justify-content: space-evenly;

  @media only screen and (max-width: 768px) {
    justify-content: space-evenly;
    height: auto;
  }
  @media only screen and (max-width: 680px) {
    padding-top: 40px;
  }
`;

function AboutUs() {
    return (
        <StyledWrapper>
            <StyledAppContainer>
                <div>Hello! My name is bobo</div>
            </StyledAppContainer>
        </StyledWrapper>
    );
}

export default AboutUs;
