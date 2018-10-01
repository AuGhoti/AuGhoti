import axios from "axios";

export const init = () => {
	loadCurrentActions();
	loadHistoricalActions();
	loadActivities();
  return { type: "INIT" };
};

export const login = (username, password) => {
  return dispatch => {
    axios
      .post("/auth/login", { username, password })
      .then(res => dispatch({ type: "LOGIN_SUCCESSFUL", data: res.data.token }))
      .catch(err => dispatch({ type: "LOGIN_ERROR", data: err }));
  };
};

export const logout = () => {
  return { type: "LOGOUT_SUCCESSFUL" };
};

export const loadCurrentActions = () => {
  return dispatch => {
    axios
      .get("/api/currentActions")
      .then(res => dispatch({ type: "CURRENTACTIONS_LOADED", data: res.data }))
      .catch(err => console.log(err));
  };
};

export const loadHistoricalActions = () => {
  return dispatch => {
    axios
      .get("/api/historicalActions")
      .then(res => dispatch({ type: "HISTORICALACTIONS_LOADED", data: res.data }))
      .catch(err => console.log(err));
  };
};

export const loadActivities = () => {
  return dispatch => {
    axios
      .get("/api/activities")
      .then(res => dispatch({ type: "ACTIVITIES_LOADED", data: res.data }))
      .catch(err => console.log(err));
  };
};
