import {
  SET_WORKOUT,
  INCREMENT_INDEX,
  DECREMENT_TIMER,
  WORKOUT_COMPLETED
} from "../actions/types";

const INITIAL_STATE = {
  exerciseIndex: 0,
  timer: 30,
  name: "",
  selectedExercises: []
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_WORKOUT:
      return {
        ...state,
        ...action.payload,
        timer: action.payload.selectedExercises[0].duration,
      }
    case INCREMENT_INDEX:
      return {
        ...state,
        timer: state.selectedExercises[state.exerciseIndex + 1].duration,
        exerciseIndex: state.exerciseIndex + 1
      }
    case DECREMENT_TIMER:
      return {
        ...state,
        timer: state.timer - 1
      }
    case WORKOUT_COMPLETED:
      return {
        ...INITIAL_STATE
      }
    default:
      return state;
  }
}
