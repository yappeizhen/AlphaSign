import "./App.css";

// Import dependencies
import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

import { Modal } from '@material-ui/core';
import { CircularProgress } from "@mui/material"
import * as tf from "@tensorflow/tfjs";

import aslImg from "../src/assets/images/ASL_Alphabet.png"
import boyImg from "../src/assets/images/boy-hand.png"
import tick from "../src/assets/images/checked.png"
import studyIcon from "../src/assets/images/notebook.png";
import fistBump from "../src/assets/images/peace.png"
import { wordBank } from "../src/constants/wordBank";
import DSButton from "./components/DSButton";
import TextBubble from "./components/TextBubble";
// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";
import { drawRect } from "./utilities";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isCorrect,] = useState(false);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const chooseRandomAlphabet = () => {
    const i = Math.floor(Math.random() * 25);
    return wordBank[i];
  }
  const [currentWord, setCurrentWord] = useState(chooseRandomAlphabet());

  // Main function
  const runCoco = useCallback(
    async () => {
      // 3. TODO - Load network 
      console.log('Loading Model')
      // e.g. const net = await cocossd.load();
      // https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json
      // const net = await tf.loadGraphModel('https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json')
      const net = await tf.loadGraphModel('https://raw.githubusercontent.com/yappeizhen/Sign-Language-Image-Recognition/master/ReactCV/src/model/model.json')
      console.log('Loaded Model')
      setIsLoading(false);
      //  Loop and detect hands
      setInterval(() => {
        detect(net);
      }, 16.7);
    }, [])

  const detect = async (net) => {
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
      console.log(obj)

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
      requestAnimationFrame(() => { drawRect(boxes[0], classes[0], scores[0], 0.5, videoWidth, videoHeight, ctx) });

      tf.dispose(img)
      tf.dispose(resized)
      tf.dispose(casted)
      tf.dispose(expanded)
      tf.dispose(obj)

    }
  };

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
    setCountdown(3);
    setIsStarted(true);
  }
  const onExit = () => {
    setIsStarted(false);
  }
  const onNextQuestion = () => {
    handleChooseAlphabet();
  }
  const handleChooseAlphabet = () => {
    setCurrentWord(chooseRandomAlphabet());
  }

  return (
    <div className="App">
      <div className="App-container">
        <div className="app-bar">
          <div style={{ marginRight: "20px", width: "auto" }}>
            <h1>Sign Language Game</h1>
            <p className="name-text">by Zhili and Pei Zhen</p>
          </div>
          <img src={fistBump} className="fistbump" alt="Fist Bump" />
        </div>
        <div className="content-body">
          <div className="left-panel">
            <TextBubble>
              <div className={`bubble-wrapper pre-start ${!isStarted ? "visible" : "hidden"}`}>
                <h2>Ready to start?</h2>
                <CircularProgress style={{ display: `${isLoading ? "inline" : "none"}` }} color="secondary" />
                <div className="start-button" style={{ display: `${!isLoading ? "inline" : "none"}` }}>
                  <DSButton onClick={onStart} text="Let's Go!" />
                </div>
              </div>
              <div className={`bubble-wrapper ${countdown > 0 ? "visible" : "hidden"}`}>
                <h2 style={{ fontWeight: 500, fontSize: 60 }}>{countdown}</h2>
              </div>
              <div className={`bubble-wrapper ${isStarted && countdown === 0 ? "visible" : "hidden"}`}>
                <p className="prompt">Sign this alphabet:</p>
                <p className="target-word">{currentWord}</p>
                <div className="response-button-group">
                  <DSButton onClick={onExit} text="Exit" />
                  <DSButton onClick={onNextQuestion} text="Next Question!" />
                </div>
              </div>
            </TextBubble>
            <div className="boy-container">
              <img className="boy-img" alt="Boy raising hand" src={boyImg}></img>
              <button className="study-button gradient-button" onClick={handleModalOpen}>
                <img src={studyIcon} className="study-icon" alt="Sign language alphabet" />
                <span className="tooltiptext">American sign language alphabet guide</span>
              </button>
              <Modal
                open={isModalOpen}
                onClose={handleModalClose}
                aria-labelledby="ASL Guide"
                aria-describedby="A short guide to American Sign Language Alphabets"
                className="asl-modal">
                <img src={aslImg} alt="American Sign Language Guide" className="asl-img" />
              </Modal>
            </div>
          </div>
          <div className="cam-wrapper">
            <div className={`success-screen ${isCorrect ? "visible" : "hidden"}`}>
              <img src={tick} alt="Check mark" className="tick-icon" />
            </div>
            <Webcam
              ref={webcamRef}
              muted={true}
              className="webcam"
            />
            <canvas
              ref={canvasRef}
              className="canvas"
            />
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
