import React, { Component } from "react";
import { connect } from "react-redux";
import exercises from "../../data/exercises";

import { setWorkout } from "../../actions";

import DurationModal from "./DurationModal";

class CreateRoutine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routine: {
        selectedExercises: [],
        name: "New Routine"
      },
      durationToSet: 30,
      showDurationModal: false
    }
  }
  renderExercises = () =>  {
    // map through imported exercises array
    return exercises.map(exercise => {
      // return a div with image and name for each exercise
      return (
        <div key={exercise.name} onClick={() => this.selectExercise(exercise)}>
          <img
            src={exercise.image}
            alt={exercise.name}
            width={200}
            className={this.isSelected(exercise) ? "selected" : "unselected"}
          />
          <p>{exercise.name}</p>
        </div>
      )
    })
  }
  selectExercise = (exercise) => {
    // append exercise to end of selectedExercises array
    // set showDurationModal to true
    this.setState({
      routine: {
        ...this.state.routine,
        selectedExercises: [...this.state.routine.selectedExercises, exercise]
      },
      showDurationModal: true
    })
  }
  isSelected = (exercise) => {
    //if one of the selectedExercises has the same name as exercise, return true
    return this.state.routine.selectedExercises.some(selected => {
      return selected.name === exercise.name
    })
  }
  renderDurationModal = () => {
    // if showDurationModal is true
    if (this.state.showDurationModal) {
      // render DurationModal
      return (
        <DurationModal
          duration={this.state.durationToSet}
          handleDurationChange={this.handleDurationChange}
          setDuration={this.setDuration}
        />
      )
    }
  }
  setDuration = () => {
    this.setState(prevState => {
      const { selectedExercises } = prevState.routine;
      const { durationToSet } = prevState;
      // set duration of the last selected exercise equal to durationToSet
      selectedExercises[selectedExercises.length - 1].duration = durationToSet;
      // set selectedExercises to state
      // reset durationToSet and showDurationModal
      return {
        ...prevState,
        routine: { ...prevState.routine, selectedExercises },
        showDurationModal: false,
        durationToSet: 30
      }
    })
  }
  handleDurationChange = (event) => {
    this.setState({ durationToSet: parseInt(event.target.value) })
  }
  handleChange = (event) => {
    this.setState({
      routine: {
        ...this.state.routine,
        name: event.target.value
      }
    })
  }
  handleStart = () => {
    // set routine from state as current workout in redux
    this.props.setWorkout(this.state.routine);
    // navigate to '/workout'
    this.props.history.push('/workout')
  }
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.routine.name}
          onChange={this.handleChange}
        />
        {this.renderExercises()}
        <button onClick={this.handleStart}>
          Start Routine
        </button>
        {this.renderDurationModal()}
      </div>
    )
  }
}

export default connect(null, { setWorkout })(CreateRoutine);
