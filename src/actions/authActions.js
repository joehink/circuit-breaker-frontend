import axios from "axios";

import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_OUT_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  CLEAR_ERROR_MESSAGE
} from "./types";

export const signUp = (username, password, confirmation, history) => async dispatch => {
  try {
    if (password !== confirmation) {
      dispatch({ type: SIGN_UP_FAILURE, payload: "Password does not match confirmation" })
    } else {
      // make request to signUp new user
      const res = await axios.post("http://localhost:4000/users", {
        username,
        password
      })

      // request was successful
      dispatch({ type: SIGN_UP_SUCCESS, payload: res.data.token })
      localStorage.setItem('token', res.data.token);
      // navigate to root route
      history.push("/routines");
    }
  } catch (err) {
    // something went wrong with request
    dispatch({ type: SIGN_UP_FAILURE, payload: "Username is in use"  })
  }
}

export const signOut = () => {
  localStorage.removeItem('token');
  return { type: SIGN_OUT_SUCCESS }
}

export const signIn = (username, password, history) => async dispatch => {
  try {
    // make request to logIn as existing user
    const res = await axios.post("http://localhost:4000/sessions", {
      username,
      password
    })
    // request was successful
    dispatch({ type: SIGN_IN_SUCCESS, payload: res.data.token });
    localStorage.setItem('token', res.data.token);
    // navigate to root route
    history.push("/routines");
  } catch (err) {
    // something went wrong with request
    dispatch({ type: SIGN_IN_FAILURE, payload: "Invalid credentials."  })
  }
}

export const clearErrorMessage = () => {
  return { type: CLEAR_ERROR_MESSAGE }
}
