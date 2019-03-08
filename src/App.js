import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Landing from "./components/Landing";
import CreateRoutine from "./components/CreateRoutine";

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path="/" component={Landing} />
          <Route exact path="/create" component={CreateRoutine} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
