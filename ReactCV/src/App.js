import './App.css';

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import { NAV_ITEMS } from './constants/navigation.js';
import AboutUs from './pages/AboutUs';
import AllClasses from './pages/AllClasses';
import Baseline from './pages/Baseline';

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path={NAV_ITEMS.ABOUT_US.to} component={AboutUs} />
        <Route exact path={NAV_ITEMS.ALL_CLASSES.to} component={AllClasses} />
        <Route exact path={NAV_ITEMS.FOUR_CLASSES.to} component={Baseline} />
        <Route render={() => <Redirect to={NAV_ITEMS.ABOUT_US.to} />} />
      </Switch>
    </>

  );
}

export default App;
