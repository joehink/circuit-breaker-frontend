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
} from "../actions/types";

const INITIAL_STATE = {
  exerciseIndex: 0,
  timer: 30,
  name: "",
  exercises: [],
  workoutOver: false,
  workoutInProgress: false,
  showRepModal: true,
  reps: 1,
  repCount: 1
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
        workoutInProgress: false
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
        workoutInProgress: false,
        repCount: 1
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
    case CHANGE_REPS:
      return {
        ...state,
        reps: parseInt(action.payload)
      }
    case SET_REPS:
      return {
        ...state,
        showRepModal: false
      }
    case INCREMENT_REP_COUNT:
      return {
        ...state,
        repCount: state.repCount + 1,
        exerciseIndex: 0,
        timer: state.exercises[0].duration
      }
    case SHOW_REP_MODAL:
      return {
        ...state,
        showRepModal: true
      }
    default:
      return state;
  }
}
