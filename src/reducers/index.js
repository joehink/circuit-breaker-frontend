import { combineReducers } from "redux";

import workoutReducer from "./workoutReducer";
import authReducer from "./authReducer";
import routinesReducer from "./routinesReducer";

export default combineReducers({
  workout: workoutReducer,
  auth: authReducer,
  routines: routinesReducer
})
