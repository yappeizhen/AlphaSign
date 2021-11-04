// Import dependencies
import React from "react";
import styled from "styled-components"

import githubLogo from "../../src/assets/images/logos/github.png"
import linkedinLogo from "../../src/assets/images/logos/linkedin.png"

const StyledInfoCard = styled.div`
  width: 300px;
  margin-bottom: 1.5em;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: 680px) {
    flex: 1 0 27%;
    max-width: 27%;
    margin-top: 20px;
  }
`;
const StyledImage = styled.img`
  border-radius: 16px;
  width: 200px;
  height: 200px;
  object-fit: cover;
`;
const StyledLogo = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
const StyledText = styled.p`
    margin: 0;
    padding: 0;
    margin-bottom: 4px;
    text-align: center;
`;
const StyledLogoContainer = styled.div`
    margin-top: 8px;
    width: 30%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

function ProfileCard({ imgSrc, linkedin, github, name, major, university }) {
    return (
        <StyledInfoCard>
            <StyledImage src={imgSrc} />
            <br />
            <StyledText>{name}</StyledText>
            <StyledText>{major} student in {university}</StyledText>
            <StyledLogoContainer>
                {
                    linkedin && <StyledLogo
                        src={linkedinLogo}
                        onClick={() => { window.open(linkedin, '_blank') }}
                        alt="LinkedIn" />
                }
                {
                    github && <StyledLogo
                        src={githubLogo}
                        onClick={() => { window.open(github, '_blank') }}
                        alt="Github" />
                }
            </StyledLogoContainer>
        </StyledInfoCard>
    );
}

export default ProfileCard;