import axios from "axios";
import moment from "moment";

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
      .catch(err => console.error(err));
  };
};

export const loadHistoricalActions = () => {
  return dispatch => {
    axios
      .get("/api/historicalActions")
      .then(res =>
        dispatch({ type: "HISTORICALACTIONS_LOADED", data: res.data })
      )
      .catch(err => console.error(err));
  };
};

export const loadActivities = () => {
  return dispatch => {
    axios
      .get("/api/activities")
      .then(res => dispatch({ type: "ACTIVITIES_LOADED", data: res.data }))
      .catch(err => console.error(err));
  };
};

export const startAction = activity => {
  const obj = {
    activityTitle: activity,
    startDate: moment().format("Y-MM-DD"),
    startTime: moment().format("HH:mm:ssZ")
  };
  return dispatch =>
    axios
      .post("/api/currentTimers/start", obj)
      .then(res => dispatch({ type: "ACTION_STARTED", data: res.data }))
      .catch(err => console.error(err));
};

// TODO: Talk with Michael about what the API returns (assuming the new action)
export const endAction = id => {
  return dispatch =>
    axios
      .get(`/api/currentTimers/end/${id}`)
      .then(res => dispatch({ type: "ACTION_ENDED", data: res.data, id }))
      .catch(err => console.error(err));
};

export const deleteCurrentAction = id => {
  return dispatch =>
    axios
      .delete(`/api/currentTimers/${id}`)
      .then(res => dispatch({ type: "CURRENTACTION_DELETED", id }))
      .catch(err => console.error(err));
};

export const deleteHistoricalAction = id => {
  return dispatch =>
    axios
      .delete(`/api/historicalActions/${id}`)
      .then(res => dispatch({ type: "HISTORICALACTION_DELETE", id }))
      .catch(err => console.error(err));
};

export const addActivity = (title, description = "") => {
  const obj = { title };
  if (description) obj.description = description;
  return dispatch =>
    axios
      .post("/api/activity")
      .then(res => dispatch({ type: "ACTIVITY_ADDED", data: res.data }))
      .catch(err => console.error(err));
};

export const deleteActivity = id => {
  return dispatch =>
    axios
      .delete(`/api/activity/${id}`)
      .then(res => dispatch({ type: "ACTIVITY_DELETE", id }))
      .catch(err => console.error(err));
};
