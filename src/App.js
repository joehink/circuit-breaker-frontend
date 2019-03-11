import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Landing from "./components/Landing";
import Workout from "./components/workout/Workout";
import SignUp from "./components/SignUp";
import CreateRoutine from "./components/routine/CreateRoutine";

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path="/" component={Landing} />
          <Route exact path="/create" component={CreateRoutine} />
          <Route exact path="/workout" component={Workout} />
          <Route exact path="/signup" component={SignUp} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
