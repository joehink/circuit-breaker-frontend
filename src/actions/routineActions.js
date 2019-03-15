import axios from "axios";

import { CREATE_NEW_ROUTINE_SUCCESS } from "./types";

export const createRoutine = (routine) => async dispatch => {
  const newRoutine = await axios.post("http://localhost:4000/routines", routine);
  console.log(newRoutine);
  dispatch({ type: CREATE_NEW_ROUTINE_SUCCESS, payload: newRoutine })
}
