import { FETCH_ROUTINES_SUCCESS } from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_ROUTINES_SUCCESS:
      return [...action.payload];
    default:
      return state;
  }
}
