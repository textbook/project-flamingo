import reducers from "./reducers";

describe("reducers", () => {
  it("should handle initial state", () => {
    expect(
      reducers(undefined, {
        type: ""
      })
    ).toEqual({});
  });

  it("should handle SET_LOGGED_IN", () => {
    expect(
      reducers(
        { isAuthenticated: undefined, savedReport: true },
        {
          type: "SET_LOGGED_IN"
        }
      )
    ).toEqual({
      isAuthenticated: true,
      savedReport: true
    });
  });

  it("should handle SET_LOGGED_IN_ERROR", () => {
    expect(
      reducers(
        { isAuthenticated: undefined, savedReport: true },
        {
          type: "SET_LOGGED_IN_ERROR"
        }
      )
    ).toEqual({
      isAuthenticated: false,
      savedReport: true
    });
  });

  it("should handle SET_LOGGED_OUT", () => {
    expect(
      reducers(
        { isAuthenticated: true, savedReport: true },
        {
          type: "SET_LOGGED_OUT"
        }
      )
    ).toEqual({});
  });

  it("should handle SAVE_REPORT_SUCCESS", () => {
    expect(
      reducers(
        { isAuthenticated: true, savedReport: false },
        {
          type: "SAVE_REPORT_SUCCESS"
        }
      )
    ).toEqual({
      isAuthenticated: true,
      savedReport: true
    });
  });

  it("should handle SAVE_REPORT_FAILURE", () => {
    expect(
      reducers(
        { isAuthenticated: true, savedReport: true },
        {
          type: "SAVE_REPORT_FAILURE"
        }
      )
    ).toEqual({
      isAuthenticated: true,
      savedReport: false
    });
  });
});
