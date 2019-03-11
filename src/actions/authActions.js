import axios from "axios";

import { SIGN_UP_SUCCESS } from "./types";

export const signUp = (username, password, history) => async dispatch => {
  try {
    const user = await axios.post("http://localhost:4000/users", {
      username,
      password
    })
    dispatch({ type: SIGN_UP_SUCCESS, payload: user.data })
    history.push("/");
  } catch (err) {
    console.log(err);
  }
}
