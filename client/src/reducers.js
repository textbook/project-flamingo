export type State = {
  isAuthenticated: ?boolean,
  savedReport: ?boolean
};

export const initialState: State = {
  isAuthenticated: undefined,
  savedReport: undefined
};

interface Action {
  type: string;
}

const reducers = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "SET_LOGGED_IN":
      return Object.assign({}, state, {
        isAuthenticated: true
      });
    case "SET_LOGGED_IN_ERROR":
      return Object.assign({}, state, {
        isAuthenticated: false
      });
    case "SET_LOGGED_OUT":
      return initialState;
    case "SAVE_REPORT_SUCCESS":
      return Object.assign({}, state, {
        savedReport: true
      });
    case "SAVE_REPORT_FAILURE":
      return Object.assign({}, state, {
        savedReport: false
      });
    default:
      return state;
  }
};

export default reducers;
