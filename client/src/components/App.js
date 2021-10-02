import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import LandingPage from "./views/LandingPage.js";
import LoginPage from "./views/LoginPage.js";
import RegisterPage from "./views/RegisterPage.js";
// import Auth from "../hoc/auth";

function App() {
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/" component={ LandingPage } />
          <Route exact path="/login" component={ LoginPage } />
          <Route exact path="/register" component={ RegisterPage } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
