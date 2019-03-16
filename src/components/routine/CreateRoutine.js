import React, { Component } from "react";
import { connect } from "react-redux";
import exercises from "../../data/exercises";

import { setWorkout, createRoutine } from "../../actions";

import DurationModal from "./DurationModal";

class CreateRoutine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routine: {
        exercises: [],
        name: "New Routine"
      },
      durationToSet: 30,
      showDurationModal: false
    }
  }
  renderExercises = () =>  {
    // map through imported exercises array
    return exercises.map((exercise, index) => {
      // return a div with image and name for each exercise
      return (
        <div key={index} onClick={() => this.selectExercise(exercise)}>
          <img
            src={exercise.image}
            alt={exercise.name}
            width={200}
          />
          <p>{exercise.name}</p>
        </div>
      )
    })
  }
  renderRoutineExercises = () =>  {
    // map through selected exercises array
    return this.state.routine.exercises.map((exercise, index) => {
      // return a div with image and name for each exercise
      return (
        <div
          key={index}
          onDragOver={() => this.onDragOver(index)}
        >
          <i
            className="fas fa-times"
            onClick={() => this.removeExercise(index)}
          ></i>
          <img
            onDragStart={e => this.onDragStart(e, index)}
            onDragEnd={this.onDragEnd}
            draggable
            src={exercise.image}
            alt={exercise.name}
            width={200}
          />
          <p>{exercise.name}</p>
        </div>
      )
    })
  }
  renderSave = () => {
    const { authenticated } = this.props.auth;

    if (authenticated) {
      return (
        <button
          onClick={() => this.props.createRoutine(this.state.routine, authenticated, this.props.history)}
        >
          Save Routine
        </button>
      )
    }
  }
  selectExercise = (exercise) => {
    // append exercise to end of selectedExercises array
    // set showDurationModal to true
    this.setState({
      routine: {
        ...this.state.routine,
        exercises: [...this.state.routine.exercises, exercise]
      },
      showDurationModal: true
    })
  }
  removeExercise = (index) => {
    this.setState(prevState => {
      prevState.routine.exercises.splice(index, 1);
      return {
        ...prevState,
        routine: {
          ...prevState.routine,
          exercises: [...prevState.routine.exercises]
        }
      }
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
      const { exercises } = prevState.routine;
      const { durationToSet } = prevState;
      // set duration of the last selected exercise equal to durationToSet
      exercises[exercises.length - 1].duration = durationToSet;
      // set selectedExercises to state
      // reset durationToSet and showDurationModal
      return {
        ...prevState,
        routine: { ...prevState.routine, exercises },
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
  onDragStart = (event, index) => {
    // set draggedItem equal to the exercise that is being dragged
    this.draggedItem = this.state.routine.exercises[index];
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", event.target.parentNode);
    event.dataTransfer.setDragImage(event.target.parentNode, 100, 100);
  }
  onDragOver = index => {
    const draggedOverItem = this.state.routine.exercises[index];

    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item
    let selected = this.state.routine.exercises.filter(exercise => {
      return exercise !== this.draggedItem
    });

    // add the dragged item after the dragged over item
    selected.splice(index, 0, this.draggedItem);

    this.setState({
      routine: {
        ...this.state.routine,
        exercises: selected
      }
    });
  }
  onDragEnd = () => {
    this.draggedItem = null;
  }
  render() {
    return (
      <div>
        <h2>Create Routine</h2>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={this.state.routine.name}
          onChange={this.handleChange}
          id="name"
        />
        <h3>Exercises</h3>
        <div>
          {this.renderExercises()}
        </div>
        <h3>Selected</h3>
        <div>
          {this.renderRoutineExercises()}
        </div>
        { this.renderSave() }
        <button onClick={this.handleStart}>
          Start Routine
        </button>
        {this.renderDurationModal()}
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
}

export default connect(mapStateToProps, { setWorkout, createRoutine })(CreateRoutine);
