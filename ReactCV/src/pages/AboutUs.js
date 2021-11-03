import "../App.css";

// Import dependencies
import React from "react";
import styled from "styled-components"

import GithubImg from "../../src/assets/images/GitHub-Emblem.png";
import backgroundImg from "../../src/assets/images/about-us-background.png";
import Keyword from "../components/Keyword";

// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";

// Styled Components

const StyledWrapper = styled.div`
  color: rgb(40, 44, 52);
  background-image: url(${backgroundImg});
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
        <div align="justify" style={{ margin: '100px' }}>
          Hey there! Welcome to SignAI, developed by <Keyword url="https://github.com/ngzhili" text="Ng Zhili" /> and <Keyword url="https://github.com/yappeizhen" text="Yap Pei Zhen" /> in 2021.
          <p>
            We created SignAI as part of our deep learning project to inquire how can we leverage on AI to encourage more people to learn sign langauge.
            The web application is developed using React and Node.js, and hosted on Github Pages.
            SignAI leverages on finetuning pre-trained ssd mobilenetv2 fpnlite 320x320 from <Keyword url="https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/tf2_detection_zoo.md" text="Tensorflow2 Detection Model Zoo" />

            , and <Keyword url="https://www.tensorflow.org/js" text="Tensorflow.js" />
            , a JavaScript library for Machine Learning on the browser.
          </p>

          <p>
            If you are interested to see how we build our app, you can view our source code below.
          </p>

          <a href="https://github.com/yappeizhen/Sign-Language-Image-Recognition">
            <img src={GithubImg} alt="Github Emblem" style={{ width: "10%" }}></img>

          </a>
        </div>
      </StyledAppContainer>
    </StyledWrapper>
  );
}

export default AboutUs;
