import axios from "axios";

import {
  CREATE_NEW_ROUTINE_SUCCESS,
  FETCH_ROUTINES_SUCCESS,
  DELETE_ROUTINE_SUCCESS,
  UPDATE_ROUTINE_SUCCESS
} from "./types";

export const createRoutine = (routine, jwt, history) => async dispatch => {
  const res = await axios({
    method: "POST",
    url: "https://ga-circuit-breaker-api.herokuapp.com/routines",
    data: routine,
    headers: { authorization: jwt }
  });
  dispatch({ type: CREATE_NEW_ROUTINE_SUCCESS, payload: res.data });
  history.push('/');
}

export const updateRoutine = (routine, jwt, history) => async dispatch => {
  const res = await axios({
    method: "PUT",
    url: `https://ga-circuit-breaker-api.herokuapp.com/routines/${routine._id}`,
    data: routine,
    headers: { authorization: jwt }
  });
  dispatch({ type: UPDATE_ROUTINE_SUCCESS, payload: res.data })
  history.push('/routines');
}

export const fetchRoutines = jwt => async dispatch => {
  const res = await axios({
    method: "GET",
    url: "https://ga-circuit-breaker-api.herokuapp.com/routines",
    headers: { authorization: jwt }
  })
  dispatch({ type: FETCH_ROUTINES_SUCCESS, payload: res.data });
}

export const deleteRoutine = (routineId, jwt) => async dispatch =>{
  await axios({
    method: "DELETE",
    url: `https://ga-circuit-breaker-api.herokuapp.com/routines/${routineId}`,
    headers: { authorization: jwt }
  })
  dispatch({ type: DELETE_ROUTINE_SUCCESS, payload: routineId });
}
