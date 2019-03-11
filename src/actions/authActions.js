import axios from "axios";

import { SIGN_UP_SUCCESS, LOG_IN_SUCCESS, FETCH_USER_SUCCESS } from "./types";

export const signUp = (username, password, history) => async dispatch => {
  try {
    // make request to signUp new user
    const user = await axios.post("http://localhost:4000/users", {
      username,
      password
    })
    // request was successful
    dispatch({ type: SIGN_UP_SUCCESS, payload: user.data })
    // navigate to root route
    history.push("/");
  } catch (err) {
    // something went wrong with request
    console.error(err);
  }
}

export const logIn = (username, password, history) => async dispatch => {
  try {
    // make request to logIn as existing user
    const user = await axios.post("http://localhost:4000/sessions", {
      username,
      password
    })
    // request was successful
    dispatch({ type: LOG_IN_SUCCESS, payload: user.data })
    // navigate to root route
    history.push("/");
  } catch (err) {
    // something went wrong with request
    console.error(err);
  }
}

export const fetchUser = () => async dispatch => {
  try {
    // make request to get current user
    const user = await axios.get("http://localhost:4000/users");
    // request was successful
    dispatch({ type: FETCH_USER_SUCCESS, payload: user.data })
  } catch (err) {
    // something went wrong with request
    console.error(err);
  }
}
