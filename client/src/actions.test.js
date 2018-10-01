import * as actions from "./actions";

describe("todo actions", () => {
  it("loginSuccessful should create SET_LOGGED_IN action", () => {
    expect(actions.loginSuccessful()).toEqual({
      type: "SET_LOGGED_IN"
    });
  });

  it("loginFailed should create SET_NOT_LOGGED_IN action", () => {
    expect(actions.loginFailed()).toEqual({
      type: "SET_NOT_LOGGED_IN"
    });
  });
});
