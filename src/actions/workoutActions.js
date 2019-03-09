import { SET_WORKOUT } from "./types";


export const setWorkout = (workout) => {
  return { type: SET_WORKOUT, payload: workout };
}
