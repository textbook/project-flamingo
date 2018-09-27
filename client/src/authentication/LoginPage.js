import React, { Component, Fragment } from "react";
import { Button, Grid, TextField } from "@material-ui/core";

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: null,
      credentials: {
        username: "",
        password: ""
      }
    };
  }

  login = () => {
    this.props.login(this.state.credentials).then(isAuthenticated => {
      this.setState({ isAuthenticated });
    });
  };

  changeCredentials = (key, event) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [key]: event.target.value
      }
    });
  };

  render() {
    return (
      <Fragment>
        <Grid item container alignItems="center" justify="center">
          <TextField
            data-test-id="username-input"
            label="Email"
            type="email"
            variant="outlined"
            onChange={event => this.changeCredentials("username", event)}
            value={this.state.credentials.username}
          />
          <TextField
            data-test-id="password-input"
            label="Password"
            type="password"
            variant="outlined"
            onChange={event => this.changeCredentials("password", event)}
            value={this.state.credentials.password}
          />
          <Button
            variant="outlined"
            color="primary"
            data-test-id="login-button"
            onClick={() => this.login()}
          >
            Login
          </Button>
        </Grid>
        {this.state.isAuthenticated === false && (
          <Grid item>
            <p data-test-id="login-error">Invalid credentials</p>
          </Grid>
        )}
        {this.state.isAuthenticated === true && (
          <Grid item>
            <p data-test-id="login-success">Valid credentials</p>
          </Grid>
        )}
      </Fragment>
    );
  }
}

export default LoginPage;
