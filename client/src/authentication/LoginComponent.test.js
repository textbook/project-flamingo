import React from "react";
import { shallow } from "enzyme";
import Deferred from "promise-deferred";

import LoginComponent from "./LoginComponent";

describe("LoginComponent", () => {
  let wrapper;
  let mockLogin;
  let deferred;
  let mockLoginSuccessful;
  let mockLoginFailed;

  beforeEach(() => {
    deferred = new Deferred();
    mockLogin = jest.fn(() => deferred.promise);
    mockLoginSuccessful = jest.fn();
    mockLoginFailed = jest.fn();

    wrapper = shallow(
      <LoginComponent
        login={mockLogin}
        loginSuccessful={mockLoginSuccessful}
        loginFailed={mockLoginFailed}
      />
    );
  });

  it("calls login service when clicking button", () => {
    const username = "ellen@ip.org";
    const password = "flamingo";

    login(username, password);

    expect(mockLogin).toHaveBeenCalledWith({
      username,
      password
    });
  });

  it("sets authentication state when the promise is resolved false", done => {
    login("foo", "bar");
    deferred.resolve(false);

    setTimeout(() => {
      expect(mockLoginSuccessful).not.toHaveBeenCalled();
      expect(mockLoginFailed).toHaveBeenCalled();
      done();
    });
  });

  it("sets authentication state when the promise is resolved true", done => {
    login("foo", "bar");
    deferred.resolve(true);

    setTimeout(() => {
      expect(mockLoginSuccessful).toHaveBeenCalled();
      expect(mockLoginFailed).not.toHaveBeenCalled();
      done();
    });
  });

  function login(username, password) {
    wrapper
      .find('[data-test-id="username-input"]')
      .simulate("change", { target: { value: username } });
    wrapper
      .find('[data-test-id="password-input"]')
      .simulate("change", { target: { value: password } });
    wrapper.find('[data-test-id="login-button"]').simulate("click");
  }
});
