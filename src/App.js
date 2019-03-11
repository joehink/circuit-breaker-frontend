import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchUser } from "./actions";

import Landing from "./components/Landing";
import Workout from "./components/workout/Workout";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import CreateRoutine from "./components/routine/CreateRoutine";
import Routines from "./components/routine/Routines";

class App extends Component {
  renderRoutines = () => {
    switch (this.props.auth) {
      case null:
        // waiting for fetchUser to complete
        return <div></div>
      case false:
        // no user logged in
        return <Landing />
      default:
        // auth is not false or null (success)
        return <Routines />
    }
  }
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path="/" render={() => this.renderRoutines()} />
          <Route exact path="/create" component={CreateRoutine} />
          <Route exact path="/workout" component={Workout} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={LogIn} />
        </Fragment>
      </Router>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps, { fetchUser })(App);
