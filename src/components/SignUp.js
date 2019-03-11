import React, { Component } from "react";
import { connect } from "react-redux";

import { signUp } from "../actions";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.signUp(
      this.state.username,
      this.state.password,
      this.props.history
    );
  }
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.username}
          onChange={this.handleChange}
          placeholder="Username"
          id="username"
          required
        />
        <input
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          placeholder="Password"
          id="password"
          required
        />
        <input type="submit" value="Sign Up" />
      </form>
    )
  }
}

export default connect(null, { signUp })(SignUp)
