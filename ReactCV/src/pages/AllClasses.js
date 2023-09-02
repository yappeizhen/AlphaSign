import "../App.css";

// Import dependencies
import React from "react";
import GameTemplate from "../components/GameTemplate";
import { letterBank } from "../constants/wordBank";

function AllClasses() {
  return (
    <GameTemplate
      id="extended"
      title="Extended Model"
      description={
        "This model was trained on 24 alphabets for a more holistic representation of a sign language alphabet game. The letters 'J' and 'Z' were excluded as they are dynamic signs that involve motion."
      }
      wordBank={letterBank}
      modelUrl={
        "https://raw.githubusercontent.com/yappeizhen/AlphaSign/master/ReactCV/src/tfjs_model_mobilenetv2_fpnlite_all_classes_v2/model.json"
      }
      colorTheme={"secondary"}
    />
  );
}

export default AllClasses;
