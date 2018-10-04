import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware
} from "redux";
import thunk from "redux-thunk";

const isAuthenticated = (prev = false, action) => {
  switch (action.type) {
    // TODO: this won't work like intended
    // case "INIT":
    // return localStorage.getItem("token") ? true : false;
    case "LOGIN_SUCCESSFUL":
      return true;
    case "LOGOUT_SUCCESSFUL":
      return false;
    default:
      return prev;
  }
};

const token = (prev = null, action) => {
  // TODO: this won't work as intended
  switch (action.type) {
    // case "INIT":
    //   return localStorage.getItem("token");
    case "LOGIN_SUCCESSFUL":
      localStorage.setItem("token", action.data.token);
      localStorage.setItem("id", action.data.user._id);
      return action.data;
    case "LOGOUT_SUCCESSFUL":
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      return "";
    default:
      return prev;
  }
};

const userInfo = (prev = {}, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESSFUL":
      return action.data.user;
    case "LOGOUT_SUCCESSFUL":
      return {};
    default:
      return prev;
  }
};

const currentAction = (prev = [], action) => {
  switch (action.type) {
    case "LOGOUT_SUCCESSFUL":
      return [];
    case "CURRENTACTIONS_LOADED":
      return action.data;
    case "ACTION_STARTED":
      return [...prev, action.data];
    case "ACTION_ENDED":
    case "CURRENTACTION_DELETED":
      return prev.filter(v => v._id !== action.id);
    default:
      return prev;
  }
};

const isCurrentActionsLoaded = (prev = false, action) => {
  switch (action.type) {
    case "LOGOUT_SUCCESSFUL":
      return false;
    case "CURRENTACTIONS_LOADED":
      return true;
    default:
      return prev;
  }
};

const historicalActions = (prev = [], action) => {
  switch (action.type) {
    case "LOGOUT_SUCCESSFUL":
      return [];
    case "HISTORICALACTIONS_LOADED":
      return action.data;
    case "ACTION_ENDED":
      const pages = {
        page: prev.page,
        pages: prev.pages,
        actions: [...prev.actions, action.data]
      }
      return pages
    case "HISTORICALACTION_DELETED":
      return prev.filter(v => v._id !== action.data);
    default:
      return prev;
  }
};

const isHistoricalActionsLoaded = (prev = false, action) => {
  switch (action.type) {
    case "LOGOUT_SUCCESSFUL":
      return false;
    case "HISTORICALACTIONS_LOADED":
      return true;
    default:
      return prev;
  }
};

const activities = (prev = [], action) => {
  switch (action.type) {
    case "LOGOUT_SUCCESSFUL":
      return [];
    case "ACTIVITIES_LOADED":
      return action.data;
    case "ACTIVITY_ADDED":
      return [...prev, action.data];
    case "ACTIVITY_DELETED":
      return prev.filter(v => v._id !== action.id);
    default:
      return prev;
  }
};

const isActivitiesLoaded = (prev = false, action) => {
  switch (action.type) {
    case "LOGOUT_SUCCESSFUL":
      return false;
    case "ACTIVITIES_LOADED":
      return true;
    default:
      return prev;
  }
};

// TODO: Revisit and use for all API errors
const error = (prev = "", action) => {
  switch (action.type) {
    case "AUTH_ERROR":
      return action.data;
    case "LOGIN_SUCCESSFUL":
      return "";
    default:
      return prev;
  }
};

const reducer = combineReducers({
  isAuthenticated,
  token,
  userInfo,
  currentAction,
  isCurrentActionsLoaded,
  historicalActions,
  isHistoricalActionsLoaded,
  activities,
  isActivitiesLoaded,
  error
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(reducer, composeEnhancers(applyMiddleware(thunk)));