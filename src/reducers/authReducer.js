import { SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return action.payload || false;

    default:
      return state;
  }
}
