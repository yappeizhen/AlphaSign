import "./App.css";

import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import { NAV_ITEMS } from "./constants/navigation.js";
import AboutUs from "./pages/AboutUs";
import AllClasses from "./pages/AllClasses";
import Baseline from "./pages/Baseline";
import WordGame from "./pages/WordGame";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path={NAV_ITEMS.ABOUT_US.to} component={AboutUs} />
        <Route exact path={NAV_ITEMS.FOUR_CLASSES.to} component={Baseline} />
        <Route exact path={NAV_ITEMS.ALL_CLASSES.to} component={AllClasses} />
        <Route exact path={NAV_ITEMS.WORD_GAME.to} component={WordGame} />
        <Route render={() => <Redirect to={NAV_ITEMS.WORD_GAME.to} />} />
      </Switch>
    </>
  );
}

export default App;
