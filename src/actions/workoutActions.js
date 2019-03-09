import {
  SET_WORKOUT,
  INCREMENT_INDEX,
  DECREMENT_TIMER,
  WORKOUT_COMPLETED
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
