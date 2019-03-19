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
  updateRoutine,
  updateExercises
} from "../../actions";

class EditRoutine extends Component {
  renderExercises = () =>  {
    // map through imported exercises array
    return exercises.map((exercise, index) => {
      // return a div with image and name for each exercise
      return (
        <div
          key={index}
          onClick={() => this.props.selectExercise(exercise)}
          className="exercise"
        >
          <img
            src={exercise.image}
            alt={exercise.name}
            width="150"
          />
          <p className="exercise-name">{exercise.name}</p>
        </div>
      )
    })
  }
  renderRoutineExercises = () =>  {
    if (this.props.editRoutine.routine.exercises.length) {
      // map through selected exercises array
      return this.props.editRoutine.routine.exercises.map((exercise, index) => {
        // return a div with image and name for each exercise
        return (
          <div
            key={index}
            onDragOver={() => this.onDragOver(index)}
            className="selected-exercise"
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
              width="150"
            />
            <p className="exercise-name">{exercise.name}</p>
          </div>
        )
      })
    } else {
        return <p className="selected-exercise-warning">No selected exercises.</p>
    }
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
    this.draggedItem = this.props.editRoutine.routine.exercises[index];
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
    let selected = this.props.editRoutine.routine.exercises.filter(exercise => {
      return exercise !== this.draggedItem
    });

    // add the dragged item after the dragged over item
    selected.splice(index, 0, this.draggedItem);

    this.props.updateExercises(selected)
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
        <div className="routine-form">
          <div className="container">
            <h2>Edit Routine</h2>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={editRoutine.routine.name}
              onChange={handleChange}
              id="name"
              className="form-input"
            />
            <h3>Exercises</h3>
            <div className="exercise-container">
              {this.renderExercises()}
            </div>
            <h3>Selected</h3>
            <div className="exercise-container">
              {this.renderRoutineExercises()}
            </div>
            <button
              onClick={() => updateRoutine(editRoutine.routine, auth.authenticated, history)}
              className="form-button"
              disabled={!this.props.editRoutine.routine.exercises.length}
            >
              Save Routine
            </button>
            {this.renderDurationModal()}
          </div>
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
    updateRoutine,
    updateExercises
  }),
  requireAuth
)(EditRoutine);
