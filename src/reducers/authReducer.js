import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_IN_SUCCESS,
  FETCH_USER_SUCCESS
} from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return action.payload || false;
    case LOG_IN_SUCCESS:
      return action.payload || false;
    case FETCH_USER_SUCCESS:
      return action.payload || false;
    default:
      return state;
  }
}
