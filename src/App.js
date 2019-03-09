import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Landing from "./components/Landing";
import Workout from "./components/Workout";
import CreateRoutine from "./components/routine/CreateRoutine";

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path="/" component={Landing} />
          <Route exact path="/create" component={CreateRoutine} />
          <Route exact path="/workout" component={Workout} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
