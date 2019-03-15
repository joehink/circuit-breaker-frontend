import {
  FETCH_ROUTINES_SUCCESS,
  DELETE_ROUTINE_SUCCESS
} from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_ROUTINES_SUCCESS:
      return [...action.payload];
    case DELETE_ROUTINE_SUCCESS:
      const index = state.findIndex(routine => routine._id === action.payload);
      const updatedRoutines = [...state];
      updatedRoutines.splice(index, 1);
      return updatedRoutines;
    default:
      return state;
  }
}
