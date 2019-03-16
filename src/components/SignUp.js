import React, { Component } from "react";
import { connect } from "react-redux";

import { signUp } from "../actions";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordConfirmation: ""
    }
  }
  handleSubmit = (event) => {
    // prevent form from refreshing page
    event.preventDefault();
    // call signUp function
    this.props.signUp(
      this.state.username,
      this.state.password,
      this.state.passwordConfirmation,
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
  renderIcon = () => {
    if (this.state.passwordConfirmation) {
      if (this.state.passwordConfirmation !== this.state.password) {
        return <i className="fas fa-times"></i>
      } else {
        return <i className="fas fa-check"></i>
      }
    }
  }
  render() {
    return (
      <div>
        <h2>Sign Up</h2>
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
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            type="password"
            value={this.state.passwordConfirmation}
            onChange={this.handleChange}
            placeholder="Confirm Password"
            id="passwordConfirmation"
            required
          />
          { this.renderIcon() }
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps, { signUp })(SignUp)
