import { SET_WORKOUT } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case SET_WORKOUT:
      return action.payload;
    default:
      return state;
  }
}
