import React, { Component } from "react";
import { connect } from "react-redux";

import AuthService from "./authService";
import LoginComponent from "./LoginComponent";
import { loginSuccessful, loginFailed } from "../actions";

class LoginPage extends Component {
  constructor() {
    super();
    this.authService = new AuthService();
  }

  render() {
    return (
      <LoginComponent
        login={this.authService.login}
        loginSuccessful={this.props.loginSuccessful}
        loginFailed={this.props.loginFailed}
        isAuthenticated={this.props.isAuthenticated}
      />
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  loginSuccessful: () => dispatch(loginSuccessful()),
  loginFailed: () => dispatch(loginFailed())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
