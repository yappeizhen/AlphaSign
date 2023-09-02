import "../App.css";

// Import dependencies
import React from "react";
import GameTemplate from "../components/GameTemplate";
import { wordBank } from "../constants/wordBank";

function WordGame() {
  return (
    <GameTemplate
      id="wordgame"
      title="Word Game"
      description={
        "This is a simple game developed based on the AlphaSign extended model"
      }
      wordBank={wordBank}
      modelUrl={
        "https://raw.githubusercontent.com/yappeizhen/AlphaSign/master/ReactCV/src/tfjs_model_mobilenetv2_fpnlite_all_classes_v2/model.json"
      }
      isWordMode
    />
  );
}

export default WordGame;
