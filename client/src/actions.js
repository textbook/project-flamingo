import type { Dispatch } from "redux";

import type { Credentials } from "./authentication/models";
import type { Report } from "./report/models";

export const loginSuccessful = () => ({
  type: "SET_LOGGED_IN"
});

export const loginFailed = () => ({
  type: "SET_LOGGED_IN_ERROR"
});

export const logout = () => ({
  type: "SET_LOGGED_OUT"
});

export const login = (credentials: Credentials) => (dispatch: Dispatch<any>) =>
  fetch("/api/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(credentials)
  }).then(res => {
    if (res.status === 200) {
      dispatch(loginSuccessful());
    } else {
      dispatch(loginFailed());
    }
  });

export const saveReportSuccessful = () => ({
  type: "SAVE_REPORT_SUCCESS"
});

export const saveReportFailed = () => ({
  type: "SAVE_REPORT_FAILURE"
});

export const saveReport = (report: Report) => (dispatch: Dispatch<any>) => {
  fetch("/api/reports/1", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(report)
  }).then(res => {
    if (res.status === 200) {
      dispatch(saveReportSuccessful());
    } else {
      dispatch(saveReportFailed());
    }
  });
};
