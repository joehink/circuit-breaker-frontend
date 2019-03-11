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
          />
          <p>{exercise.name}</p>
        </div>
      )
    })
  }
  renderSelectedExercises = () =>  {
    // map through selected exercises array
    return this.state.routine.selectedExercises.map((exercise, index) => {
      // return a div with image and name for each exercise
      return (
        <div
          key={exercise.name}
          onDragOver={() => this.onDragOver(index)}
        >
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
  onDragStart = (event, index) => {
    // set draggedItem equal to the exercise that is being dragged
    this.draggedItem = this.state.routine.selectedExercises[index];
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", event.target.parentNode);
    event.dataTransfer.setDragImage(event.target.parentNode, 100, 100);
  };
  onDragOver = index => {
    const draggedOverItem = this.state.routine.selectedExercises[index];

    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item
    let selected = this.state.routine.selectedExercises.filter(exercise => {
      return exercise !== this.draggedItem
    });

    // add the dragged item after the dragged over item
    selected.splice(index, 0, this.draggedItem);

    this.setState({
      routine: {
        ...this.state.routine,
        selectedExercises: selected
      }
    });
  };
  onDragEnd = () => {
    this.draggedItem = null;
  };
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.routine.name}
          onChange={this.handleChange}
        />
        {this.renderExercises()}
        <div
          // onDragOver={(e)=>this.onDragOver(e)}
          // onDrop={(e)=>{this.onDrop(e, "selected")}}
        >
          <h2>Selected Exercises</h2>
          {this.renderSelectedExercises()}
        </div>
        <button onClick={this.handleStart}>
          Start Routine
        </button>
        {this.renderDurationModal()}
      </div>
    )
  }
}

export default connect(null, { setWorkout })(CreateRoutine);
