import React, { Component } from "react";
import { connect } from "react-redux";

import CompletedModal from "./CompletedModal";
import RepModal from "./RepModal";

import {
  decrementTimer,
  incrementIndex,
  setWorkout,
  workoutCompleted,
  resetCurrentWorkout,
  clearWorkout,
  beginWorkout,
  pauseWorkout,
  setReps,
  repsChange,
  incrementRepCount
} from "../../actions";

class Workout extends Component {
  startTimer = () => {
    this.props.beginWorkout()
    // ser timer interval when start button is clicked
    this.exerciseTimer = setInterval(() => {
      // function runs once every second

      const { timer, exerciseIndex, exercises, reps, repCount } = this.props.workout;
      // if the timer is less than 1 and there is a next exercise
      if ((timer < 1) && (exerciseIndex < exercises.length - 1)) {
        // increment index to next exercise
        this.props.incrementIndex();
      } else if (timer < 1 && repCount >= reps) {
        // if the timer is less than one is there is no next exercise
        // clear the timer interval
        clearInterval(this.exerciseTimer);
        this.props.workoutCompleted()
      } else if (timer < 1) {
        this.props.incrementRepCount();
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
  renderRepModal = () => {
    if (this.props.workout.showRepModal) {
      return (
        <RepModal
          reps={this.props.workout.reps}
          repsChange={this.props.repsChange}
          setReps={this.props.setReps}
        />
      )
    }
  }
  renderExercises = () => {
    return this.props.workout.exercises.map((exercise, index) => {
      return (
        <img
          key={index}
          src={exercise.image}
          alt={exercise.name}
          width="50"
        />
      )
    })
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
          <h2>{ workout.name }</h2>
          <div>
            <div>
              <img
                src={workout.exercises[workout.exerciseIndex].image}
                alt={workout.exercises[workout.exerciseIndex].name}
                width="400"
              />
              <div>
                { this.renderExercises() }
              </div>
            </div>
            <div>
              <h3>{ workout.exercises[workout.exerciseIndex].name }</h3>
              <span>{ workout.timer }</span>
              { this.startOrPause() }
              <button onClick={this.handleReset}>Reset</button>
              { this.renderCompletedModal() }
              { this.renderRepModal() }
            </div>
          </div>
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
  componentWillUnmount() {
    if (this.exerciseTimer) {
      clearInterval(this.exerciseTimer);
      this.props.pauseWorkout()
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
  pauseWorkout,
  setReps,
  repsChange,
  incrementRepCount
})(Workout);
