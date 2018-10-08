import * as actions from "./actions";
import { assertLater } from "./testHelpers";

describe("actions", () => {
  describe("login", () => {
    it("loginSuccessful should create SET_LOGGED_IN action", () => {
      expect(actions.loginSuccessful()).toEqual({
        type: "SET_LOGGED_IN"
      });
    });

    it("loginFailed should create SET_LOGGED_IN_ERROR action", () => {
      expect(actions.loginFailed()).toEqual({
        type: "SET_LOGGED_IN_ERROR"
      });
    });

    it("loginInitialized should create SET_LOGGED_OUT action", () => {
      expect(actions.logout()).toEqual({
        type: "SET_LOGGED_OUT"
      });
    });

    describe("login", () => {
      let action;
      let mockDispatch;

      const username = "cookie monster";
      const password = "COOKIES!";

      beforeEach(() => {
        mockDispatch = jest.fn();
        fetch.resetMocks();

        action = actions.login({ username, password });
      });

      it("makes a request to the backend with the appropriate credentials", () => {
        fetch.mockResponseOnce("{}");

        action(mockDispatch);

        expect(fetch.mock.calls.length).toEqual(1);
        const [url, options] = fetch.mock.calls[0];
        expect(url).toEqual("/api/login");
        expect(options.method).toBe("POST");
        expect(options.headers["content-type"]).toBe("application/json");
        expect(JSON.parse(options.body)).toEqual({ username, password });
      });

      it("dispatches login success action when the request succeeds", done => {
        fetch.mockResponseOnce("{}");

        action(mockDispatch);

        assertLater(done, () => {
          expect(mockDispatch).toHaveBeenCalledWith(actions.loginSuccessful());
        });
      });

      it("dispatches login failed action when the request fails", done => {
        fetch.mockResponseOnce("", { status: 401 });

        action(mockDispatch);

        assertLater(done, () => {
          expect(mockDispatch).toHaveBeenCalledWith(actions.loginFailed());
        });
      });
    });
  });

  describe("reports", () => {
    it("saveReportSuccessful should create SAVE_REPORT_SUCCESS action", () => {
      expect(actions.saveReportSuccessful()).toEqual({
        type: "SAVE_REPORT_SUCCESS"
      });
    });

    it("saveReportFailed should create SAVE_REPORT_FAILURE action", () => {
      expect(actions.saveReportFailed()).toEqual({
        type: "SAVE_REPORT_FAILURE"
      });
    });

    describe("saveReport", () => {
      let action;
      let mockDispatch;
      const overview = "My report overview";

      beforeEach(() => {
        mockDispatch = jest.fn();
        fetch.resetMocks();

        action = actions.saveReport({ overview });
      });

      it("makes a request to the backend with report progress status", () => {
        fetch.mockResponseOnce("{}");

        action(mockDispatch);

        expect(fetch.mock.calls.length).toEqual(1);
        const [url, options] = fetch.mock.calls[0];
        expect(url).toEqual("/api/reports/1");
        expect(options.method).toBe("POST");
        expect(options.headers["content-type"]).toBe("application/json");
        expect(JSON.parse(options.body)).toEqual({ overview });
      });

      it("dispatches save report success when the request succeeds", done => {
        fetch.mockResponseOnce("{}");

        action(mockDispatch);

        assertLater(done, () => {
          expect(mockDispatch).toHaveBeenCalledWith(
            actions.saveReportSuccessful()
          );
        });
      });

      it("dispatches save report failed when the request fails with 4xx", done => {
        fetch.mockResponseOnce("", { status: 400 });

        action(mockDispatch);

        assertLater(done, () => {
          expect(mockDispatch).toHaveBeenCalledWith(actions.saveReportFailed());
        });
      });
    });
  });
});
