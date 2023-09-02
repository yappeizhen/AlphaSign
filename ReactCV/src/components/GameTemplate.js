import "../App.css";

// Import dependencies
import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import backgroundImg from "../assets/images/background.jpg";
import { Modal } from "@material-ui/core";
import { CircularProgress, Slider, Switch } from "@mui/material";
import * as tf from "@tensorflow/tfjs";

import aslImg from "../../src/assets/images/ASL_Alphabet.png";
import boyImg from "../../src/assets/images/boy-hand.png";
import tick from "../../src/assets/images/checked.png";
import studyIcon from "../../src/assets/images/notebook.png";
import DSButton from "../components/DSButton";
import Footer from "../components/Footer";
import TextBubble from "../components/TextBubble";
import { drawRect } from "../utilities";

// Styled Components
const StyledWrapper = styled.div`
  color: rgb(40, 44, 52);
  background-image: url(${backgroundImg});
  background-size: cover;
  height: auto;
  padding: 20px 0 0 0;
`;
const StyledAppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: poppins;
  align-items: center;
  gap: 12px;
  @media only screen and (max-width: 680px) {
    padding-top: 40px;
  }
`;
const StyledAppBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 12px;
  margin-bottom: 8px;
`;
const StyledH1 = styled.h1`
  font-size: 28px;
  padding: 0;
  margin: 0;
  text-align: center;
  @media only screen and (max-width: 768px) {
    font-size: 20px;
  }
`;
const StyledH2 = styled.h2`
  font-size: 24px;
  @media only screen and (max-width: 768px) {
    font-size: 15px;
  }
`;
const StyledContentBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media only screen and (max-width: 768px) {
    flex-direction: column-reverse;
    justify-content: center;
  }
`;
const StyledLeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  @media only screen and (max-width: 768px) {
    width: 70%;
    margin-top: 32px;
    height: auto;
  }
`;
const StyledRightPanel = styled.div`
  height: 100%;
  width: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 768px) {
    width: 70%;
  }
`;
const StyledCamWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledLoadingText = styled.p`
  font-size: 20px;
  font-weight: 600;
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
const StyledCamLoadingScreen = styled.div`
  display: ${(props) => (props.hidden ? "none" : "flex")};
  position: absolute;
  text-align: center;
  z-index: 12;
  width: 85%;
  height: calc(100% - 24px);
  border-radius: 24px;
  background-color: rgb(240, 248, 255, 0.5);
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: calc(100% - 16px);
    border-radius: 28px;
  }
`;
const StyledSuccessScreen = styled.div`
  display: ${(props) => (props.hidden ? "none" : "flex")};
  position: absolute;
  text-align: center;
  z-index: 12;
  width: 85%;
  height: calc(100% - 24px);
  border-radius: 24px;
  background-color: rgba(166, 247, 220, 0.527);
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: calc(100% - 16px);
    border-radius: 28px;
  }
`;
const StyledTickIcon = styled.img`
  width: 140px;
  @media only screen and (max-width: 768px) {
    width: 96px;
  }
`;
const StyledCanvas = styled.canvas`
  position: absolute;
  text-align: center;
  z-index: 10;
  width: 85%;
  height: calc(100% - 24px);
  border-radius: 24px;
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: calc(100% - 16px);
    border-radius: 28px;
  }
`;
const StyledWebcam = styled(Webcam)`
  text-align: center;
  z-index: 9;
  max-width: 85%;
  height: 100%;
  border-radius: 40px;
  border: 16px solid rgb(40, 44, 52);
  box-shadow: 8px 8px 2px 4px rgb(40, 44, 52, 0.5);
  @media only screen and (max-width: 680px) {
    max-width: 100%;
    border: 8px solid rgb(40, 44, 52);
    box-shadow: 8px 8px 2px 4px rgb(40, 44, 52, 0.5);
  }
`;
const StyledAslImg = styled.img`
  height: 80%;
  max-width: 90%;
`;
const StyledAslModal = styled(Modal)`
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledDescription = styled.div`
  text-align: center;
  margin: 4px;
  max-width: 50rem;
  font-size: 14px;
  @media only screen and (max-width: 768px) {
    font-size: 10px;
    padding: 0;
    max-width: 70%;
  }
`;
const StyledResponseButtonGroup = styled.div`
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 12px;
  @media only screen and (max-width: 768px) {
    margin-top: 12px;
  }
`;
const StyledBubbleWrapper = styled.div`
  display: ${(props) => (props.hidden ? "none" : "flex")};
  height: 100%;
  width: 100%;
  padding: 12px;
  flex-direction: column;
  justify-content: ${(props) => (props.prestart ? "center" : "space-evenly")};
  align-items: center;
`;
const StyledStudyIcon = styled.img`
  width: 3em;
  height: 3em;
`;
const StyledIntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledPrompt = styled.p`
  font-weight: 400;
  font-size: 24px;
  padding: 0;
  margin: 0;
  @media only screen and (max-width: 768px) {
    font-size: 20px;
  }
`;
const StyledWordContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const StyledWordImg = styled.img`
  max-height: 100px;
  display: ${(props) => (props.hidden ? "none" : "inline")};
`;
const StyledTargetWord = styled.p`
  font-weight: 600;
  font-size: 48px;
  padding: 0;
  margin: 12px;
  @media only screen and (max-width: 768px) {
    font-size: 40px;
  }
`;
const StyledLetterDisplay = styled.span`
  color: ${(props) => (props.isEmphasized ? "black" : "rgba(0, 0, 0, 0.5)")};
`;
const StyledBoyImg = styled.img`
  margin-top: 40px;
  width: 35%;
`;
const StyledTogglePanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
`;
const StyledSwitchGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  visibility: ${(props) => (props.isHidden ? "hidden" : "visible")};
`;
const StyledSwitchLabel = styled.p`
  font-size: 14px;
  text-align: center;
  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
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
  font-size: 40px;
  display: ${(props) => (props.hidden ? "none" : "flex")};
  @media only screen and (max-width: 768px) {
    font-size: 32px;
  }
`;
const StyledTable = styled.table`
  background-color: whitesmoke;
  width: 40%;
  min-width: 200px;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  table-layout: fixed;
`;
const StyledSliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const StyledSliderLabel = styled.p`
  font-size: 14px;
  padding: 0;
  margin: 0;
  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const MODEL_INDEXES = {
  baseline: {
    boxes: 7,
    classes: 4,
    scores: 6,
  },
  extended: {
    boxes: 0,
    classes: 2,
    scores: 4,
  },
};

function GameTemplate({
  index,
  title,
  description,
  isBaseline,
  wordBank,
  modelUrl,
  isWordMode,
}) {
  const localStorageKey = `${index}ScoreSheet`;
  const [isStarted, setIsStarted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLetterCorrect, setIsLetterCorrect] = useState(false);
  const [doneLetterIndex, setDoneLetterIndex] = useState(-1);
  const [currentWordBankIndex, setCurrentWordBankIndex] = useState(null);
  const [showAnswer, setShowAnswer] = useState(true);
  const [scoreSheet, setScoreSheet] = useState([]);
  const [score, setScore] = useState(0);
  const [threshold, setThreshold] = useState(0.7);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const currentWordBankIndexRef = useRef(null);
  const doneLetterIndexRef = useRef(-1);
  const intervalIdRef = useRef(null);
  const modelRef = useRef(null);
  const scoreRef = useRef(0);
  const scoreSheetRef = useRef([]);
  const thresholdRef = useRef(0.7);

  const chooseRandomWord = useCallback(() => {
    const i = Math.floor(Math.random() * wordBank.length);
    return i;
  }, [wordBank]);

  // Helper functions
  const handleChooseWord = useCallback(() => {
    doneLetterIndexRef.current = -1;
    setDoneLetterIndex(-1);
    let newWord = chooseRandomWord();
    while (newWord === currentWordBankIndexRef.current) {
      newWord = chooseRandomWord();
    }
    setCurrentWordBankIndex(newWord);
    currentWordBankIndexRef.current = newWord;
  }, [chooseRandomWord]);

  const onNextQuestion = () => {
    setIsLetterCorrect(false);
    handleChooseWord();
  };

  const onNextLetter = useCallback(() => {
    setIsLetterCorrect(false);
    if (
      // If user has completed the whole word
      doneLetterIndexRef.current + 1 ===
      wordBank[currentWordBankIndexRef.current].word.length
    ) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
      handleChooseWord(); // if user has completed whole word, choose next word
    }
  }, [handleChooseWord, wordBank]);

  const updateScoreSheet = useCallback(() => {
    if (scoreRef.current > 0) {
      const today = new Date();
      const currentScore = scoreRef.current;
      let newScoreSheet = scoreSheetRef.current;
      newScoreSheet.push({ date: today, score: currentScore });
      setScoreSheet(newScoreSheet);
      scoreSheetRef.current = newScoreSheet;
      localStorage.setItem(localStorageKey, JSON.stringify(newScoreSheet));
    }
  }, [localStorageKey]);

  useEffect(() => {
    const jsonScoresheet = localStorage.getItem(localStorageKey);
    if (jsonScoresheet) {
      const ss = JSON.parse(jsonScoresheet);
      setScoreSheet(ss);
      scoreSheetRef.current = ss;
    }
    return () => {
      updateScoreSheet();
    };
  }, [updateScoreSheet, localStorageKey]);

  // Main function
  const detect = useCallback(
    async (net) => {
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

        const ctx = canvasRef.current.getContext("2d");
        ctx.font = "20px normal bold courier";
        ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);

        // 4. TODO - Make Detections
        const img = tf.browser.fromPixels(video);
        const resized = tf.image.resizeBilinear(img, [640, 480]);
        const casted = resized.cast("int32");
        const expanded = casted.expandDims(0);
        const obj = await net.executeAsync(expanded);
        //console.log(obj)

        if (obj) {
          setIsLoading(false);
        }

        const modelIndexes = isBaseline
          ? MODEL_INDEXES.baseline
          : MODEL_INDEXES.extended;
        const boxes = await obj[modelIndexes.boxes].array();
        const classes = await obj[modelIndexes.classes].array();
        const scores = await obj[modelIndexes.scores].array();

        // Draw mesh
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          const curWord = wordBank[currentWordBankIndexRef.current]?.word;
          const curLetterIndex = doneLetterIndexRef.current + 1;
          const curLetter = curWord?.charAt(curLetterIndex).toUpperCase();
          // 5. TODO - Update drawing utility
          // drawSomething(obj, ctx)
          requestAnimationFrame(() => {
            const result = drawRect(
              boxes[0],
              classes[0],
              scores[0],
              thresholdRef.current,
              videoWidth,
              videoHeight,
              ctx,
              curLetter
            );
            if (result) {
              setIsLetterCorrect(true); // mark letter as correct
              const doneIndex = doneLetterIndexRef.current + 1;
              doneLetterIndexRef.current = doneIndex;
              setDoneLetterIndex(doneIndex);
              setTimeout(() => {
                onNextLetter();
              }, 1000);
            }
          });
        }
        tf.dispose(img);
        tf.dispose(resized);
        tf.dispose(casted);
        tf.dispose(expanded);
        tf.dispose(obj);
      }
    },
    [onNextLetter, wordBank, isBaseline]
  );

  const runCoco = useCallback(async () => {
    tf.setBackend("webgl");
    console.log("Backend : ", tf.getBackend());
    console.log("Loading Model");

    const net = await tf.loadGraphModel(modelUrl);
    modelRef.current = net;

    console.log("Loaded Model");
    //  Loop and detect hands
    intervalIdRef.current = setInterval(() => {
      detect(net);
      console.log(`# of tensors: ${tf.memory().numTensors}`);
    }, 1000);
  }, [detect, modelUrl]);

  useEffect(() => {
    runCoco();
    return () => {
      clearInterval(intervalIdRef.current);
      if (modelRef.current) {
        console.log("Cleaning");
        modelRef.current.dispose();
      }
    };
  }, [runCoco]);

  // Render Methods
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

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
    handleChooseWord();
    setCountdown(3);
    setIsStarted(true);
  };
  const onExit = () => {
    updateScoreSheet();
    setIsStarted(false);
    setCurrentWordBankIndex(null);
    currentWordBankIndexRef.current = null;
    setScore(0);
    scoreRef.current = 0;
  };

  return (
    <StyledWrapper backgroundImg={backgroundImg}>
      <StyledAppContainer>
        <StyledAppBar>
          <StyledIntroContainer>
            <StyledH1>{title}</StyledH1>
            <StyledDescription>{description}</StyledDescription>
          </StyledIntroContainer>
        </StyledAppBar>
        <StyledContentBody>
          <StyledLeftPanel>
            <div style={{ width: "100%", fontWeight: "600", fontSize: "20px" }}>
              Your Score: {score}
            </div>
            <TextBubble>
              <StyledBubbleWrapper prestart={true} hidden={isStarted}>
                <StyledH2>Ready to start?</StyledH2>
                <CircularProgress
                  style={{ display: `${isLoading ? "inline" : "none"}` }}
                />
                <div style={{ display: `${!isLoading ? "inline" : "none"}` }}>
                  <DSButton onClick={onStart} text="Let's Go!" />
                </div>
              </StyledBubbleWrapper>
              <StyledBubbleWrapper hidden={countdown <= 0}>
                <StyledCountdown>{countdown}</StyledCountdown>
              </StyledBubbleWrapper>
              <StyledBubbleWrapper hidden={!isStarted || countdown > 0}>
                <StyledPrompt>Sign this:</StyledPrompt>
                <StyledWordContainer>
                  {wordBank[currentWordBankIndex]?.img && (
                    <StyledWordImg
                      hidden={!showAnswer}
                      src={wordBank[currentWordBankIndex].img}
                      alt="Target sign language"
                    />
                  )}
                  <StyledTargetWord>
                    {wordBank[currentWordBankIndex]?.word
                      ?.split("")
                      .map((letter, idx) => {
                        return (
                          <StyledLetterDisplay
                            key={idx}
                            isEmphasized={!isWordMode || doneLetterIndex >= idx}
                          >
                            {letter}
                          </StyledLetterDisplay>
                        );
                      })}
                  </StyledTargetWord>
                </StyledWordContainer>
                <StyledResponseButtonGroup>
                  <DSButton onClick={onExit} text="Exit" />
                  <DSButton onClick={onNextQuestion} text="Next Question!" />
                </StyledResponseButtonGroup>
              </StyledBubbleWrapper>
            </TextBubble>
            <StyledBoyContainer>
              <StyledBoyImg alt="Boy raising hand" src={boyImg}></StyledBoyImg>
              <StyledTogglePanel>
                <StyledSwitchGroup isHidden={isWordMode}>
                  <StyledSwitchLabel>Show answers:</StyledSwitchLabel>
                  <Switch
                    checked={showAnswer}
                    onChange={() => setShowAnswer(!showAnswer)}
                  />
                </StyledSwitchGroup>
                <button className="study-button" onClick={handleModalOpen}>
                  <StyledStudyIcon
                    src={studyIcon}
                    alt="Sign language alphabet"
                  />
                  <span className="tooltiptext">
                    American sign language alphabet guide
                  </span>
                </button>
              </StyledTogglePanel>
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
          <StyledRightPanel>
            <StyledSliderContainer>
              <StyledSliderLabel>Detection Threshold</StyledSliderLabel>
              <Slider
                size="small"
                value={threshold}
                onChange={(e) => {
                  setThreshold(e.target.value);
                  thresholdRef.current = e.target.value;
                }}
                valueLabelDisplay="auto"
                min={0}
                max={1}
                step={0.05}
                style={{ width: "70%", margin: 0 }}
              />
            </StyledSliderContainer>
            <StyledCamWrapper>
              <StyledCamLoadingScreen hidden={!isLoading}>
                <StyledLoadingText>Loading Model...</StyledLoadingText>
              </StyledCamLoadingScreen>
              <StyledSuccessScreen hidden={!isLetterCorrect}>
                <StyledTickIcon src={tick} alt="Check mark" />
              </StyledSuccessScreen>
              <StyledWebcam ref={webcamRef} muted={true} audio={false} />
              <StyledCanvas ref={canvasRef} />
            </StyledCamWrapper>
          </StyledRightPanel>
        </StyledContentBody>
      </StyledAppContainer>
      <StyledAppContainer>
        <StyledH1>Your Scores</StyledH1>
        {(!scoreSheet || scoreSheet.length === 0) && (
          <div>Play the game and accumulate scores!</div>
        )}
        {scoreSheet && scoreSheet.length > 0 && (
          <StyledTable>
            <thead>
              <tr>
                <th>Date</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody style={{ maxHeight: "200px", overflowY: "auto" }}>
              {scoreSheet &&
                scoreSheet
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((item) => {
                    return (
                      <tr key={item.date} style={{ height: "24px" }}>
                        <td
                          style={{
                            textAlign: "center",
                            paddingLeft: "16px",
                            paddingRight: "16px",
                          }}
                        >
                          {new Date(item.date).toLocaleDateString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            paddingLeft: "16px",
                            paddingRight: "16px",
                          }}
                        >
                          {item.score}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </StyledTable>
        )}
      </StyledAppContainer>
      <Footer />
    </StyledWrapper>
  );
}

export default GameTemplate;
