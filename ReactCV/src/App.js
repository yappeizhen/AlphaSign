import "./App.css";

// Import dependencies
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

import { Grid, Modal } from '@material-ui/core';
import * as tf from "@tensorflow/tfjs";

import aslImg from "../src/assets/images/ASL_Alphabet.png"
import studyIcon from "../src/assets/images/study.png";
import DSButton from "./components/DSButton";
import TextBubble from "./components/TextBubble";
// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";
import { drawRect } from "./utilities";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network 
    // e.g. const net = await cocossd.load();
    // https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json
    const net = await tf.loadGraphModel('https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json')

    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 16.7);
  };

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

      const boxes = await obj[1].array()
      const classes = await obj[2].array()
      const scores = await obj[4].array()

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  
      requestAnimationFrame(() => { drawRect(boxes[0], classes[0], scores[0], 0.8, videoWidth, videoHeight, ctx) });

      tf.dispose(img)
      tf.dispose(resized)
      tf.dispose(casted)
      tf.dispose(expanded)
      tf.dispose(obj)

    }
  };

  // useEffect(()=>{runCoco()},[]);

  // Render Methods
  const handleModalOpen = () => {
    setIsModalOpen(true);
  }
  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="App">
      <div className="App-container">
        <div className="app-bar">
          <div style={{ marginRight: "20px", width: "auto" }}>
            <h1>Sign Language Game</h1>
            <p className="name-text">by Zhili and Pei Zhen</p>
          </div>
          <button className="study-button gradient-button" onClick={handleModalOpen}>
            <img src={studyIcon} className="study-icon" alt="Sign language alphabet" />
            <span class="tooltiptext">American sign language alphabet guide</span>
          </button>
          <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            aria-labelledby="ASL Guide"
            aria-describedby="A short guide to American Sign Language Alphabets"
            className="asl-modal">
            <img src={aslImg} className="asl-img" />
          </Modal>
        </div>
        <div className="content-body">
          <div className="left-panel">
            <TextBubble>
              <h2>Ready to start?</h2>
              <DSButton text="Let's Go!"/>
            </TextBubble>
          </div>
          <div className="cam-wrapper">
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
