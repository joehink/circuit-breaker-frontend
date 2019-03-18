import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class MainNav extends Component {
  renderAuthButtons = () => {
    if (!this.props.auth.authenticated) {
      return (
        <div className="auth-buttons">
          <Link className="auth-button" to="/signup">Sign Up</Link>
          <Link className="auth-button" to="/signin">Sign In</Link>
        </div>
      )
    } else {
      return (
        <div className="auth-buttons">
          <Link className="auth-button" to="/signout">Sign Out</Link>
        </div>
      )
    }
  }
  render() {
    return (
      <nav className="main-nav">
        <Link to="/" className="brand-link">
          <h1>Circuit Breaker</h1>
        </Link>
        { this.renderAuthButtons() }
      </nav>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
}

export default connect(mapStateToProps)(MainNav);
