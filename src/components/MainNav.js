import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class MainNav extends Component {
  renderAuthButtons = () => {
    if (!this.props.auth.authenticated) {
      return (
        <div>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      )
    } else {
      return (
        <div>
          <Link to="/signout">Sign Out</Link>
        </div>
      )
    }
  }
  render() {
    return (
      <nav>
        <span>Circuit Breaker</span>
        { this.renderAuthButtons() }
      </nav>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
}

export default connect(mapStateToProps)(MainNav);
