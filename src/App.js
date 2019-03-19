import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import MainNav from "./components/MainNav";
import Landing from "./components/Landing";
import Workout from "./components/workout/Workout";
import SignUp from "./components/SignUp";
import SignOut from "./components/SignOut";
import SignIn from "./components/SignIn";
import CreateRoutine from "./components/routine/CreateRoutine";
import EditRoutine from "./components/routine/EditRoutine";
import Routines from "./components/routine/Routines";

class App extends Component {
  landingOrRoutines = (props) => {
    if (this.props.auth.authenticated) {
      return <Redirect to="/routines" />
    } else {
      return <Landing {...props} />
    }
  }
  render() {
    return (
      <Router>
        <Fragment>
          <MainNav />
          <Route exact path="/" render={this.landingOrRoutines}/>
          <Route exact path="/routines" component={Routines} />
          <Route exact path="/create" component={CreateRoutine} />
          <Route exact path="/edit" component={EditRoutine} />
          <Route exact path="/workout" component={Workout} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signout" component={SignOut} />
          <Route exact path="/signin" component={SignIn} />
        </Fragment>
      </Router>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps)(App);
