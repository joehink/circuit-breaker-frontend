import axios from "axios";

import { SIGN_UP_SUCCESS, LOG_IN_SUCCESS, FETCH_USER_SUCCESS } from "./types";

export const signUp = (username, password, history) => async dispatch => {
  try {
    const user = await axios.post("http://localhost:4000/users", {
      username,
      password
    })
    dispatch({ type: SIGN_UP_SUCCESS, payload: user.data })
    history.push("/");
  } catch (err) {
    console.error(err);
  }
}

export const logIn = (username, password, history) => async dispatch => {
  try {
    const user = await axios.post("http://localhost:4000/sessions", {
      username,
      password
    })
    dispatch({ type: LOG_IN_SUCCESS, payload: user.data })
    history.push("/");
  } catch (err) {
    console.error(err);
  }
}

export const fetchUser = () => async dispatch => {
  try {
    const user = await axios.get("http://localhost:4000/users");
    dispatch({ type: FETCH_USER_SUCCESS, payload: user.data })
  } catch (err) {
    console.error(err);
  }
}
