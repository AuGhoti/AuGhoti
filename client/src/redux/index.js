import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const isAuthenticated = (prev = false, action) => {
  switch (action.type) {
    case "INIT":
      return localStorage.getItem("token") ? true : false;
    case "LOGIN_SUCCESSFUL":
      return true;
    case "LOGOUT_SUCCESSFUL":
      return false;
    default:
      return prev;
  }
};

const token = (prev = null, action) => {
  switch (action.type) {
    case "INIT":
      return localStorage.getItem("token");
    case "LOGIN_SUCCESSFUL":
      localStorage.setItem("token", action.data);
      return action.data;
    case "LOGOUT_SUCCESSFUL":
      localStorage.removeItem("token");
      return "";
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

const reducer = combineReducers({
  isAuthenticated,
  token,
  currentAction,
  isCurrentActionsLoaded,
  historicalActions,
  isHistoricalActionsLoaded,
  activities,
  isActivitiesLoaded
});

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__ || compose;
export default createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
