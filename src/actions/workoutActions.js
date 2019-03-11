import {
  SET_WORKOUT,
  INCREMENT_INDEX,
  DECREMENT_TIMER,
  WORKOUT_COMPLETED,
  CLEAR_WORKOUT,
  RESET_CURRENT_WORKOUT,
  BEGIN_WORKOUT,
  PAUSE_WORKOUT
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
