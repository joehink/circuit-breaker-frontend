import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_OUT_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  CLEAR_ERROR_MESSAGE
} from "../actions/types";

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: ''
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return {
        errorMessage: "",
        authenticated: action.payload
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        errorMessage: action.payload
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        authenticated: ''
      };
    case SIGN_IN_SUCCESS:
      return {
        errorMessage: "",
        authenticated: action.payload
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        errorMessage: action.payload
      };
    case CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: ""
      };
    default:
      return state;
  }
}
