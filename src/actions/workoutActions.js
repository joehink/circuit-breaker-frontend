import {
  SET_WORKOUT,
  INCREMENT_INDEX,
  DECREMENT_TIMER,
  WORKOUT_COMPLETED,
  CLEAR_WORKOUT,
  RESET_CURRENT_WORKOUT,
  BEGIN_WORKOUT,
  PAUSE_WORKOUT,
  CHANGE_REPS,
  SET_REPS,
  INCREMENT_REP_COUNT,
  SHOW_REP_MODAL
} from "./types";


export const setWorkout = (workout) => {
  return { type: SET_WORKOUT, payload: workout };
}

export const incrementIndex = () => {
  return { type: INCREMENT_INDEX };
}

export const decrementTimer = () => {
  return { type: DECREMENT_TIMER };
}

export const workoutCompleted = () => {
  return { type: WORKOUT_COMPLETED }
}

export const clearWorkout = () => {
  return { type: CLEAR_WORKOUT }
}

export const resetCurrentWorkout = () => {
  return { type: RESET_CURRENT_WORKOUT }
}

export const beginWorkout = () => {
  return { type: BEGIN_WORKOUT }
}
export const pauseWorkout = () => {
  return { type: PAUSE_WORKOUT }
}

export const repsChange = (event) => {
  return { type: CHANGE_REPS, payload: event.target.value }
}

export const setReps = () => {
  return { type: SET_REPS }
}

export const incrementRepCount = () => {
  return { type: INCREMENT_REP_COUNT }
}

export const showRepModal = () => {
  return { type: SHOW_REP_MODAL }
}
