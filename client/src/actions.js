import type { Dispatch } from "redux";

import type { Report } from "./report/models";
import type { Credentials, Account } from "./authentication/models";

export const loginSuccessful = (account: Account) => ({
  type: "SET_LOGGED_IN",
  payload: account
});

export const loginFailed = () => ({
  type: "SET_LOGGED_IN_ERROR"
});

export const logout = () => ({
  type: "SET_LOGGED_OUT"
});

export const requestStarted = () => ({
  type: "SET_LOADING"
});

export const requestFinished = () => ({
  type: "SET_NOT_LOADING"
});

export const login = (credentials: Credentials) => (dispatch: Dispatch<any>) =>
  makeRequest(dispatch, "/api/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(credentials)
  }).then(res => {
    if (res.status === 200) {
      res.json().then(account => {
        dispatch(loginSuccessful(account));
      });
    } else {
      dispatch(loginFailed());
    }
  });

export const receivedReports = (reports: Report[]) => ({
  type: "ADD_REPORTS",
  payload: reports
});

export const loadReports = () => (dispatch: Dispatch<any>) => {
  makeRequest(dispatch, "/api/reports")
    .then(res => res.json())
    .then((reports: any) => {
      dispatch(receivedReports(reports));
    });
};

export const updateReportSuccessful = (report: Report) => ({
  type: "SAVE_REPORT_SUCCESS",
  payload: report
});

export const updateReportFailed = () => ({
  type: "SAVE_REPORT_FAILURE"
});

export const updateReport = (report: Report) => (dispatch: Dispatch<any>) => {
  makeRequest(dispatch, `/api/reports/${report.id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(report)
  }).then(res => {
    if (res.status === 200) {
      dispatch(updateReportSuccessful(report));
    } else {
      dispatch(updateReportFailed());
    }
  });
};

const makeRequest = (
  dispatch: Dispatch<any>,
  url: string,
  options?: any = undefined
) => {
  dispatch(requestStarted());
  return fetch(url, options).then(res => {
    dispatch(requestFinished());
    return res;
  });
};
