import React, { Component } from "react";
import { connect } from "react-redux";

import { decrementTimer, incrementIndex, setWorkout } from "../actions";

class Workout extends Component {
  startTimer = () => {
    // ser timer interval when start button is clicked
    this.exerciseTimer = setInterval(() => {
      // function runs once every second

      const { timer, exerciseIndex, selectedExercises } = this.props.workout;
      // if the timer is less than 1 and there is a next exercise
      if ((timer < 1) && (exerciseIndex < selectedExercises.length - 1)) {
        // increment index to next exercise
        this.props.incrementIndex();
      } else if (timer < 1) {
        // if the timer is less than one is there is not a next exercise
        // clear the timer interval
        clearInterval(this.exerciseTimer);
      } else {
        // take one second off the timer
        this.props.decrementTimer();
      }
    }, 1000);
  }
  renderWorkout = () => {
    const { workout } = this.props;
    // if workout has a name
    if (workout.name) {
      // render workout
      return (
        <div>
          <h1>{ workout.name }</h1>
          <span>{ workout.timer }</span>
          <p>{ workout.selectedExercises[workout.exerciseIndex].name }</p>
          <button onClick={ this.startTimer }>Start</button>
        </div>
      )
    } else {
      // workout does not have a name
      // prompt the user to create a routine
      return (
        <div>
          make routine
        </div>
      )
    }
  }
  render() {
    return this.renderWorkout()
  }
}

const mapStateToProps = ({ workout }) => {
  return { workout }
}

export default connect(
  mapStateToProps, {
  decrementTimer,
  incrementIndex,
  setWorkout
})(Workout);
