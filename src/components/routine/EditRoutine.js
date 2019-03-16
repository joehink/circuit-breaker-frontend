import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import exercises from "../../data/exercises";
import { Redirect } from "react-router-dom"

import DurationModal from "./DurationModal";

import requireAuth from "../requireAuth";

import {
  selectExercise,
  handleDurationChange,
  setDuration,
  removeExercise,
  handleChange,
  updateRoutine
} from "../../actions";

class EditRoutine extends Component {
  renderExercises = () =>  {
    // map through imported exercises array
    return exercises.map((exercise, index) => {
      // return a div with image and name for each exercise
      return (
        <div key={index} onClick={() => this.props.selectExercise(exercise)}>
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
    return this.props.editRoutine.routine.exercises.map((exercise, index) => {
      // return a div with image and name for each exercise
      return (
        <div
          key={index}
          onDragOver={() => this.onDragOver(index)}
        >
          <i
            className="fas fa-times"
            onClick={() => this.props.removeExercise(index)}
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
  renderDurationModal = () => {
    // if showDurationModal is true
    if (this.props.editRoutine.showDurationModal) {
      // render DurationModal
      return (
        <DurationModal
          duration={this.props.editRoutine.durationToSet}
          handleDurationChange={this.props.handleDurationChange}
          setDuration={this.props.setDuration}
        />
      )
    }
  }
  onDragStart = (event, index) => {
    // set draggedItem equal to the exercise that is being dragged
    this.draggedItem = this.state.routine.exercises[index];
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", event.target.parentNode);
    event.dataTransfer.setDragImage(event.target.parentNode, 100, 100);
  }
  onDragOver = index => {
    const draggedOverItem = this.props.editRoutine.routine.exercises[index];

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
    const { editRoutine, handleChange, updateRoutine, auth, history } = this.props;
    if (!editRoutine.routine) {
      return <Redirect to="/routines" />
    } else {
      return (
        <div>
          <h2>Edit Routine</h2>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={editRoutine.routine.name}
            onChange={handleChange}
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
          <button
            onClick={() => updateRoutine(editRoutine.routine, auth.authenticated, history)}
          >
            Save Routine
          </button>
          {this.renderDurationModal()}
        </div>
      )
    }
  }
}

const mapStateToProps = ({ auth, editRoutine }) => {
  return { auth, editRoutine }
}

export default compose(
  connect(mapStateToProps, {
    selectExercise,
    handleDurationChange,
    setDuration,
    removeExercise,
    handleChange,
    updateRoutine
  }),
  requireAuth
)(EditRoutine);
