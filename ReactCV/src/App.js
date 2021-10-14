import "./App.css";

// Import dependencies
import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import styled from "styled-components"

import { Modal } from '@material-ui/core';
import { CircularProgress } from "@mui/material"
import * as tf from "@tensorflow/tfjs";

import aslImg from "../src/assets/images/ASL_Alphabet.png"
import backgroundImg from "../src/assets/images/background.png"
import boyImg from "../src/assets/images/boy-hand.png"
import tick from "../src/assets/images/checked.png"
import studyIcon from "../src/assets/images/notebook.png";
import fistBump from "../src/assets/images/peace.png"
import { wordBank } from "../src/constants/wordBank";
import DSButton from "./components/DSButton";
import TextBubble from "./components/TextBubble";
// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";
import { drawRect } from "./utilities"

// Styled Components

const StyledAppContainer = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: poppins;
  align-items: center;
  justify-content: space-evenly;
  color: rgb(40, 44, 52);
  background-image: url(${backgroundImg});
  background-size: cover;

  @media only screen and (max-width: 680px) {
    justify-content: space-evenly;
    height: auto;
  }
`;
const StyledAppBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 12px;
`;
const StyledH1 = styled.h1`
  font-size: 44px;
  padding: 0;
  margin: 0;
  @media only screen and (max-width: 680px) {
    font-size: 20px;
  }
`;
const StyledH2 = styled.h2`
  font-size: 36px;
  @media only screen and (max-width: 680px) {
    font-size: 15px;
  }
`;
const StyledContentBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 100%;
  @media only screen and (max-width: 680px) {
    flex-direction: column-reverse;
    justify-content: center;
  }
`;
const StyledLeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 30%;
  @media only screen and (max-width: 680px) {
    width: 70%;
    margin-top: 32px;
    height: auto;
    justify-content: center;
    align-items: center;
  }
`;
const StyledCamWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 680px) {
    width: 70%;
  }
`;
const StyledSuccessScreen = styled.div`
  display: ${props => props.hidden ? "none" : "flex"};
  position: absolute;
  text-align: center;
  z-index: 12;
  width: 100%;
  height: calc(100% - 24px);
  border-radius: 24px;
  background-color: rgba(166, 247, 220, 0.527);
  justify-content: center;
  align-items: center;
`;
const StyledTickIcon = styled.img`
  width: 140px;
`;
const StyledCanvas = styled.canvas`
  position: absolute;
  text-align: center;
  z-index: 10;
  width: 85%;
  height: calc(100% - 24px);
  border-radius: 24px;  
  @media only screen and (max-width: 680px) {
    width: 100%;
  }
`;
const StyledWebcam = styled(Webcam)`
  text-align: center;
  z-index: 9;
  width: 85%;
  height: 100%;
  border-radius: 40px;
  border: 16px solid rgb(40, 44, 52);
  box-shadow: 20px 20px 2px 4px rgb(40, 44, 52, 0.5);
  @media only screen and (max-width: 680px) {
    width: 100%;
  }
`;
const StyledAslImg = styled.img`
  height: 80%;
  max-width: 70%;
`;
const StyledAslModal = styled(Modal)`
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledNameText = styled.div`
  text-align: right;
  margin: 4px;
  @media only screen and (max-width: 680px) {
    font-size: 8px;
    padding: 0;
  }
`;
const StyledResponseButtonGroup = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
const StyledBubbleWrapper = styled.div`
  display: ${props => props.hidden ? "none" : "flex"};
  height: 100%;
  flex-direction: column;
  justify-content: ${props => props.prestart ? "center" : "space-evenly"};
  align-items: center;
`;
const StyledStudyIcon = styled.img`
  height: 60px;
  width: 60px;
  @media only screen and (max-width: 680px) {
    height: 40px;
    width: 40px
  }
`;
const StyledPeaceSign = styled.img`
  height: 80px;
  width: 80px;
  padding: 0;
  @media only screen and (max-width: 680px) {
    height: 40px;
    width: 40px
  }
`;
const StyledPrompt = styled.p`
  font-weight: 400;
  font-size: 40px;
  padding: 0;
  margin: 0;
  @media only screen and (max-width: 680px) {
    font-size: 20px;
  }
`;
const StyledTargetWord = styled.p`
  font-weight: 600;
  font-size: 72px;
  padding: 0;
  margin: 12px;
  @media only screen and (max-width: 680px) {
    font-size: 40px;
  }
`;
const StyledBoyImg = styled.img`
  margin-top: 40px;
  width: 45%;
`;
const StyledBoyContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  overflow-y: hidden;
`;
const StyledCountdown = styled.p`
  font-size: 52px;
  display: ${props => props.hidden ? "none" : "flex"};
  @media only screen and (max-width: 680px) {
    font-size: 32px;
  }
`;
function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const chooseRandomAlphabet = useCallback(() => {
    const i = Math.floor(Math.random() * 25);
    return wordBank[i];
  }, [])
  const [currentWord, setCurrentWord] = useState(null);

  // Helper functions
  const handleChooseAlphabet = useCallback(() => {
    setCurrentWord(chooseRandomAlphabet());
  }, [chooseRandomAlphabet]);
  const onNextQuestion = useCallback(() => {
    setIsCorrect(false);
    handleChooseAlphabet();
  }, [handleChooseAlphabet]);

  // Main function
  const detect = useCallback(async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      const img = tf.browser.fromPixels(video)
      const resized = tf.image.resizeBilinear(img, [640, 480])
      const casted = resized.cast('int32')
      const expanded = casted.expandDims(0)
      const obj = await net.executeAsync(expanded)
      //console.log(obj)

      // const boxes = await obj[2].array()
      // const classes = await obj[5].array()
      // const scores = await obj[4].array()

      const boxes = await obj[6].array()
      const classes = await obj[1].array()
      const scores = await obj[3].array()

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  
      requestAnimationFrame(() => {
        const result = drawRect(boxes[0], classes[0], scores[0], 0.5, videoWidth, videoHeight, ctx, currentWord);
        if (result) {
          setIsCorrect(true);
          setTimeout(() => {
            onNextQuestion();
          }, 500);
        }
      });

      tf.dispose(img)
      tf.dispose(resized)
      tf.dispose(casted)
      tf.dispose(expanded)
      tf.dispose(obj)

    }
  }, [currentWord, onNextQuestion]);
  const runCoco = useCallback(
    async () => {
      // 3. TODO - Load network 
      //console.log('Loading Model')
      // e.g. const net = await cocossd.load();
      // https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json
      // const net = await tf.loadGraphModel('https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json')
      const net = await tf.loadGraphModel('https://raw.githubusercontent.com/yappeizhen/Sign-Language-Image-Recognition/master/ReactCV/src/model/model.json')
      //console.log('Loaded Model')
      setIsLoading(false);
      //  Loop and detect hands
      setInterval(() => {
        detect(net);
      }, 2000);
    }, [detect]);

  useEffect(() => { runCoco() }, [runCoco]);

  // Render Methods
  const handleModalOpen = () => {
    setIsModalOpen(true);
  }
  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 500);
    }
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [countdown]);
  const onStart = () => {
    setCurrentWord(chooseRandomAlphabet());
    setCountdown(3);
    setIsStarted(true);
  }
  const onExit = () => {
    setIsStarted(false);
  }

  return (
    <StyledAppContainer>
      <StyledAppBar>
        <div>
          <StyledH1>Sign Language Game</StyledH1>
          <StyledNameText>by Zhili and Pei Zhen</StyledNameText>
        </div>
        <StyledPeaceSign src={fistBump} alt="V Sign" />
      </StyledAppBar>
      <StyledContentBody>
        <StyledLeftPanel>
          <TextBubble>
            <StyledBubbleWrapper prestart={true} hidden={isStarted}>
              <StyledH2>Ready to start?</StyledH2>
              <CircularProgress style={{ display: `${isLoading ? "inline" : "none"}` }} color="secondary" />
              <div style={{ display: `${!isLoading ? "inline" : "none"}` }}>
                <DSButton onClick={onStart} text="Let's Go!" />
              </div>
            </StyledBubbleWrapper>
            <StyledBubbleWrapper hidden={countdown <= 0}>
              <StyledCountdown>{countdown}</StyledCountdown>
            </StyledBubbleWrapper>
            <StyledBubbleWrapper hidden={!isStarted || countdown > 0}>
              <StyledPrompt>Sign this alphabet:</StyledPrompt>
              <StyledTargetWord>{currentWord}</StyledTargetWord>
              <StyledResponseButtonGroup>
                <DSButton onClick={onExit} text="Exit" />
                <DSButton onClick={onNextQuestion} text="Next Question!" />
              </StyledResponseButtonGroup>
            </StyledBubbleWrapper>
          </TextBubble>
          <StyledBoyContainer>
            <StyledBoyImg alt="Boy raising hand" src={boyImg}></StyledBoyImg>
            <button className="study-button" onClick={handleModalOpen}>
              <StyledStudyIcon src={studyIcon} alt="Sign language alphabet" />
              <span className="tooltiptext">American sign language alphabet guide</span>
            </button>
            <StyledAslModal
              open={isModalOpen}
              onClose={handleModalClose}
              aria-labelledby="ASL Guide"
              aria-describedby="A short guide to American Sign Language Alphabets"
            >
              <StyledAslImg src={aslImg} alt="American Sign Language Guide" />
            </StyledAslModal>
          </StyledBoyContainer>
        </StyledLeftPanel>
        <StyledCamWrapper>

          <StyledSuccessScreen hidden={!isCorrect}>
            <StyledTickIcon src={tick} alt="Check mark" />
          </StyledSuccessScreen>
          <StyledWebcam
            ref={webcamRef}
            muted={true}
          />
          <StyledCanvas
            ref={canvasRef}
          />
        </StyledCamWrapper>
      </StyledContentBody>
    </StyledAppContainer>
  );
}

export default App;
