import React, { Component } from "react";
import { connect } from "react-redux";

import CompletedModal from "./CompletedModal";

import {
  decrementTimer,
  incrementIndex,
  setWorkout,
  workoutCompleted,
  resetCurrentWorkout,
  clearWorkout,
  beginWorkout,
  pauseWorkout
} from "../../actions";

class Workout extends Component {
  startTimer = () => {
    this.props.beginWorkout()
    // ser timer interval when start button is clicked
    this.exerciseTimer = setInterval(() => {
      // function runs once every second

      const { timer, exerciseIndex, selectedExercises } = this.props.workout;
      // if the timer is less than 1 and there is a next exercise
      if ((timer < 1) && (exerciseIndex < selectedExercises.length - 1)) {
        // increment index to next exercise
        this.props.incrementIndex();
      } else if (timer < 1) {
        // if the timer is less than one is there is no next exercise
        // clear the timer interval
        clearInterval(this.exerciseTimer);
        this.props.workoutCompleted()
      } else {
        // take one second off the timer
        this.props.decrementTimer();
      }
    }, 1000);
  }
  renderCompletedModal = () => {
    if (this.props.workout.workoutOver) {
      return (
        <CompletedModal
          resetCurrentWorkout={this.props.resetCurrentWorkout}
          clearWorkout={this.props.clearWorkout}
        />
      )
    }
  }
  handlePause = () => {
    clearInterval(this.exerciseTimer);
    this.props.pauseWorkout()
  }
  handleReset = () => {
    clearInterval(this.exerciseTimer);
    this.props.resetCurrentWorkout();
  }
  startOrPause = () => {
    if (this.props.workout.workoutInProgress) {
      return (
        <button onClick={this.handlePause}>Pause</button>
      )
    } else {
      return <button onClick={ this.startTimer }>Start</button>
    }
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
          { this.startOrPause() }
          <button onClick={this.handleReset}>Reset</button>
          { this.renderCompletedModal() }
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
  setWorkout,
  workoutCompleted,
  resetCurrentWorkout,
  clearWorkout,
  beginWorkout,
  pauseWorkout
})(Workout);
