import React, { Component } from "react";
import { connect } from "react-redux";

import { signUp, clearErrorMessage } from "../actions";

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
        <p className="error">{this.props.auth.errorMessage}</p>
      )
    }
  }
  renderIcon = () => {
    if (this.state.passwordConfirmation) {
      if (this.state.passwordConfirmation !== this.state.password) {
        return <i className="fas fa-times confirmation-icon"></i>
      } else {
        return <i className="fas fa-check confirmation-icon"></i>
      }
    }
  }
  componentWillUnmount() {
    this.props.clearErrorMessage();
  }
  render() {
    return (
      <div>
        <div className="container">
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
              className="form-input"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Password"
              id="password"
              className="form-input"
              required
            />
            <label htmlFor="passwordConfirmation">Confirm Password</label>
            <div>
              <input
                type="password"
                value={this.state.passwordConfirmation}
                onChange={this.handleChange}
                placeholder="Confirm Password"
                id="passwordConfirmation"
                className="form-input"
                required
              />
              { this.renderIcon() }
            </div>
            <input className="form-button" type="submit" value="Sign Up" />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps, { signUp, clearErrorMessage })(SignUp)
