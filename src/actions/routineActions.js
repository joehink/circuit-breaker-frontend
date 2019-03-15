import axios from "axios";

import {
  CREATE_NEW_ROUTINE_SUCCESS,
  FETCH_ROUTINES_SUCCESS,
  DELETE_ROUTINE_SUCCESS
} from "./types";

export const createRoutine = (routine, jwt) => async dispatch => {
  const res = await axios({
    method: "POST",
    url: "http://localhost:4000/routines",
    data: routine,
    headers: { authorization: jwt }
  });
  dispatch({ type: CREATE_NEW_ROUTINE_SUCCESS, payload: res.data })
}

export const fetchRoutines = jwt => async dispatch => {
  const res = await axios({
    method: "GET",
    url: "http://localhost:4000/routines",
    headers: { authorization: jwt }
  })
  dispatch({ type: FETCH_ROUTINES_SUCCESS, payload: res.data });
}

export const deleteRoutine = (routineId, jwt) => async dispatch =>{
  await axios({
    method: "DELETE",
    url: `http://localhost:4000/routines/${routineId}`,
    headers: { authorization: jwt }
  })
  dispatch({ type: DELETE_ROUTINE_SUCCESS, payload: routineId });
}
