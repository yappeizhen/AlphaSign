import "../App.css";

// Import dependencies
import React from "react";
import GameTemplate from "../components/GameTemplate";
import { letterBank } from "../constants/wordBank";

function Baseline() {
  return (
    <GameTemplate
      id="baseline"
      title="Baseline Model"
      description={
        "AlphaSign is a Sign Language Alphabet game based on an AI object detection model. This model was trained on 4 classes, 'A', 'B', 'C', and 'D' to minimise training loss."
      }
      wordBank={letterBank.slice(0, 4)}
      modelUrl={
        "https://raw.githubusercontent.com/yappeizhen/AlphaSign/master/ReactCV/src/tfjs_model_mobilenetv2_fpnlite_ABCD_best/model.json"
      }
      isBaseline={true}
    />
  );
}

export default Baseline;
