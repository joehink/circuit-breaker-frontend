import React, { Component } from "react";
import exercises from "../../data/exercises";

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
    return exercises.map(exercise => {
      return (
        <div onClick={() => this.selectExercise(exercise)}>
          <img
            key={exercise.name}
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
    this.setState({
      routine: {
        ...this.state.routine,
        selectedExercises: [...this.state.routine.selectedExercises, exercise]
      },
      showDurationModal: true
    })
  }
  isSelected = (exercise) => {
    return this.state.routine.selectedExercises.some(selected => {
      return selected.name === exercise.name
    })
  }
  renderDurationModal = () => {
    if (this.state.showDurationModal) {
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

      selectedExercises[selectedExercises.length - 1].duration = durationToSet;
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
    this.setState({ name: event.target.value })
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
        <button>Start Routine</button>
        {this.renderDurationModal()}

      </div>
    )
  }
}

export default CreateRoutine;
