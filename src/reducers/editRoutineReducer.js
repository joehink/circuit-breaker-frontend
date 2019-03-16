import {
  SET_EDIT_ROUTINE,
  SELECT_EXERCISE,
  SET_DURATION,
  REMOVE_EXERCISE,
  DURATION_CHANGE,
  NAME_CHANGE
} from "../actions/types";

const INITIAL_STATE = {
  showDurationModal: false,
  durationToSet: 30,
  routine: null
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_EDIT_ROUTINE:
      return {
        ...state,
        routine: action.payload
      };
    case SELECT_EXERCISE:
      return {
        ...state,
        showDurationModal: true,
        routine: {
          ...state.routine,
          exercises: [...state.routine.exercises, action.payload]
        }
      }
    case SET_DURATION:
      const { exercises } = state.routine;
      const { durationToSet } = state;
      // set duration of the last selected exercise equal to durationToSet
      const updatedExercises = [...exercises];
      updatedExercises[updatedExercises.length - 1].duration = durationToSet;
      // set selectedExercises to state
      // reset durationToSet and showDurationModal
      return {
        ...state,
        routine: { ...state.routine, exercises: updatedExercises },
        showDurationModal: false,
        durationToSet: 30
      }
    case REMOVE_EXERCISE:
      state.routine.exercises.splice(action.payload, 1);
      return {
        ...state,
        routine: {
          ...state.routine,
          exercises: [...state.routine.exercises]
        }
      }
    case DURATION_CHANGE:
      return {
        ...state,
        durationToSet: action.payload
      }
    case NAME_CHANGE:
      return {
        ...state,
        routine: {
          ...state.routine,
          name: action.payload
        }
      }
    default:
      return state;
  }
}
