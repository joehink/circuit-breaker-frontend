import {
  SET_WORKOUT,
  INCREMENT_INDEX,
  DECREMENT_TIMER,
  WORKOUT_COMPLETED,
  CLEAR_WORKOUT,
  RESET_CURRENT_WORKOUT,
  BEGIN_WORKOUT,
  PAUSE_WORKOUT
} from "../actions/types";

const INITIAL_STATE = {
  exerciseIndex: 0,
  timer: 30,
  name: "",
  exercises: [],
  workoutOver: false,
  workoutInProgress: false
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_WORKOUT:
      return {
        ...state,
        ...action.payload,
        timer: action.payload.exercises[0].duration,
      }
    case INCREMENT_INDEX:
      return {
        ...state,
        timer: state.exercises[state.exerciseIndex + 1].duration,
        exerciseIndex: state.exerciseIndex + 1
      }
    case DECREMENT_TIMER:
      return {
        ...state,
        timer: state.timer - 1
      }
    case WORKOUT_COMPLETED:
      return {
        ...state,
        workoutOver: true,
      }
    case CLEAR_WORKOUT:
      return {
          ...INITIAL_STATE
      }
    case RESET_CURRENT_WORKOUT:
      return {
        ...state,
        timer: state.exercises[0].duration,
        exerciseIndex: 0,
        workoutOver: false,
        workoutInProgress: false
      }
    case BEGIN_WORKOUT:
      return {
        ...state,
        workoutInProgress: true
      }
    case PAUSE_WORKOUT:
      return {
        ...state,
        workoutInProgress: false
      }
    default:
      return state;
  }
}
