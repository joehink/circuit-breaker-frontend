import { combineReducers } from "redux";

import workoutReducer from "./workoutReducer";
import authReducer from "./authReducer";
import routinesReducer from "./routinesReducer";
import editRoutineReducer from "./editRoutineReducer";

export default combineReducers({
  workout: workoutReducer,
  auth: authReducer,
  routines: routinesReducer,
  editRoutine: editRoutineReducer
})
