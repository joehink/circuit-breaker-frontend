import {
  SET_EDIT_ROUTINE,
  SELECT_EXERCISE,
  SET_DURATION,
  REMOVE_EXERCISE,
  DURATION_CHANGE,
  NAME_CHANGE
} from "./types";

export const setEditRoutine = (routine) => {
  return { type: SET_EDIT_ROUTINE, payload: routine }
}

export const selectExercise = (exercise) => {
  return { type: SELECT_EXERCISE, payload: exercise }
}

export const setDuration = () => {
  return { type: SET_DURATION }
}

export const removeExercise = (index) => {
  return { type: REMOVE_EXERCISE, payload: index }
}

export const handleDurationChange = (event) => {
  return { type: DURATION_CHANGE, payload: event.target.value }
}

export const handleChange = (event) => {
  return { type: NAME_CHANGE, payload: event.target.value }
}
