import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

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
  incrementRepCount,
  showRepModal
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
        if (window.innerWidth > 768) {
          this[`exercise${exerciseIndex + 1}`].scrollIntoView();
        }
        this.bell.play();
      } else if (timer < 1 && repCount >= reps) {
        // if the timer is less than one is there is no next exercise
        // clear the timer interval
        clearInterval(this.exerciseTimer);
        this.bell.play();
        this.props.workoutCompleted()
      } else if (timer < 1) {
        this.props.incrementRepCount();
        this.bell.play();
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
          ref={(ref) => {this[`exercise${index}`] = ref}}
          className={index === this.props.workout.exerciseIndex ? "current" : ""}
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
        <button className="form-button pause" onClick={this.handlePause}>
          Pause
        </button>
      )
    } else {
      return (
        <button className="form-button start" onClick={ this.startTimer }>
          Start
        </button>
      )
    }
  }
  renderWorkout = () => {
    const { workout } = this.props;
    // if workout has a name
    if (workout.name) {
      // render workout
      return (
        <div className="workout">
          <div className="container">
            <h2>{ workout.name }</h2>
            <div className="workout-content">
              <div className="workout-exercises">
                <img
                  src={workout.exercises[workout.exerciseIndex].image}
                  alt={workout.exercises[workout.exerciseIndex].name}
                  className="current-exercise-image"
                />
                <div className="exercise-queue">
                  { this.renderExercises() }
                </div>
              </div>
              <div className="exercise-info">
                <h3>{ workout.exercises[workout.exerciseIndex].name }</h3>
                <h4>Rep: { this.props.workout.repCount }</h4>
                <div className="timer">
                  <span>{ workout.timer }</span>
                  <div className="form-button-group">
                    { this.startOrPause() }
                    <button className="form-button" onClick={this.handleReset}>Reset</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <audio ref={(input) => {this.bell = input}} src="audio/Bell.mp3"/>
          { this.renderCompletedModal() }
          { this.renderRepModal() }
        </div>
      )
    } else {
      // workout does not have a name
      // prompt the user to create a routine
      return (
        <Redirect to="/routines" />
      )
    }
  }
  componentWillUnmount() {
    if (this.exerciseTimer) {
      clearInterval(this.exerciseTimer);
      this.props.pauseWorkout()
    }
    this.props.showRepModal();
    this.props.clearWorkout();
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
  incrementRepCount,
  showRepModal
})(Workout);
