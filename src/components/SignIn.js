import React, { Component } from "react";
import { connect } from "react-redux";

import { signIn } from "../actions";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }
  handleSubmit = (event) => {
    // prevent form from refreshing page
    event.preventDefault();
    // call logIn function
    this.props.signIn(
      this.state.username,
      this.state.password,
      this.props.history
    );
  }
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }
  renderError = () => {
    if (this.props.auth.errorMessage) {
      return (
        <p>{this.props.auth.errorMessage}</p>
      )
    }
  }
  render() {
    return (
      <div>
        <h2>Sign In</h2>
        { this.renderError() }
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="Username"
            id="username"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="Password"
            id="password"
            required
          />
          <input type="submit" value="Sign In" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
}

export default connect(mapStateToProps, { signIn })(SignIn)
