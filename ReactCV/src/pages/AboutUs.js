import "../App.css";

// Import dependencies
import React from "react";
import styled from "styled-components";

import peizhenImg from "../../src/assets/images/team/peizhen.jpeg";
import zhiliImg from "../../src/assets/images/team/zhili.jpeg";
import Keyword from "../components/Keyword";
import ProfileCard from "../components/ProfileCard";
import backgroundImg from "../assets/images/background.jpg";

// Styled Components
const StyledWrapper = styled.div`
  color: rgb(40, 44, 52);
  background-image: url(${backgroundImg});
  background-size: cover;
  height: auto;
`;
const StyledAppContainer = styled.div`
  min-height: 100vh;
  margin: 0 100px;
  display: flex;
  flex-direction: column;
  font-family: poppins;
  @media only screen and (max-width: 768px) {
    height: auto;
  }
  @media only screen and (max-width: 680px) {
    margin: 0 28px;
  }
`;
const StyledH1 = styled.h1`
  font-size: 24px;
  padding: 0;
  margin: 0;
  margin-bottom: 12px;
  text-align: left;
  @media only screen and (max-width: 768px) {
    font-size: 20px;
  }
`;
const StyledTextContainer = styled.div`
  font-size: 15px;
  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;
const StyledBodyWrapper = styled.div`
  margin: 100px;
  padding: 80px;
  border-radius: 5%;
  background-color: white;
`;
const StyledCardContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
`;
function AboutUs() {
  return (
    <StyledWrapper>
      <StyledAppContainer>
        <StyledBodyWrapper>
          <StyledH1>What is AlphaSign?</StyledH1>
          <StyledTextContainer>
            AlphaSign is an interactive game that seeks to encourage people to
            learn Sign Language, starting from the American Sign Language (ASL)
            alphabet.
          </StyledTextContainer>
          <br />
          <StyledTextContainer>
            AlphaSign was developed by two students hoping to leverage the power
            of AI to promote a more inclusive society. We hope to make the
            learning of sign language a fun and independent process by
            automating and gamifying the teaching of basic Sign Language using
            AI.
          </StyledTextContainer>
          <br />
          <StyledH1>Our Models</StyledH1>
          <StyledTextContainer>
            AlphaSign features 2 models – the Baseline Model, and the Extended
            Model. The Baseline Model was trained on four object classes, ‘A’,
            ‘B’, ‘C’, and ‘D’ to optimise for performance and accuracy. We then
            created the Extended Model which was trained on all letters of ASL
            excluding ‘J’, and ‘Z’, which are dynamic signs that require
            movement.
          </StyledTextContainer>
          <br />
          <StyledH1>Our Tech Stack</StyledH1>
          <StyledTextContainer>
            This web application was developed using ReactJs and hosted on
            Github Pages. Our deep learning model was created by fine tuning the
            pre-trained model SSD MobileNet V2 FPNLite 320x320 from &nbsp;
            <Keyword
              url="https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/tf2_detection_zoo.md"
              text="TensorFlow 2 Object Detection Model Zoo"
            />
            &nbsp;and&nbsp;
            <Keyword url="https://www.tensorflow.org/js" text="TensorFlow.js" />
            .
          </StyledTextContainer>
          <br />
          <StyledTextContainer>
            Check out our source code&nbsp;
            <Keyword
              url="https://github.com/yappeizhen/AlphaSign"
              text="here"
            />
            .
          </StyledTextContainer>
          <br />
          <StyledTextContainer>
            <StyledH1>Our Team</StyledH1>
            <StyledCardContainer>
              <ProfileCard
                imgSrc={peizhenImg}
                name="Yap Pei Zhen"
                major="Information Systems & Economics"
                university="NUS"
                github="https://github.com/yappeizhen"
                linkedin="https://www.linkedin.com/in/peizhen/"
              />
              <ProfileCard
                imgSrc={zhiliImg}
                name="Ng Zhili"
                major="Mechanical Engineering"
                university="NUS"
                github="https://github.com/ngzhili"
                linkedin="https://www.linkedin.com/in/ngzhili/"
              />
            </StyledCardContainer>
          </StyledTextContainer>
          <br />
        </StyledBodyWrapper>
      </StyledAppContainer>
    </StyledWrapper>
  );
}

export default AboutUs;
