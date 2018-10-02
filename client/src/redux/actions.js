import axios from "axios";
import moment from "moment";

//TODO: add token to headers, use those in requests requiring authentication
const authAxios = null;

const init = () => {
  loadCurrentActions();
  loadHistoricalActions();
  loadActivities();
  return { type: "INIT" };
};

export const login = (username, password) => {
  if (!username || !password) return ({type: "LOGIN_ERROR", data: "Username and password required"})
  return dispatch => {
    axios
      .post("/auth/login", { username, password })
      //TODO: set authAxios here to include the token in the header
      .then(res => {init(); dispatch({ type: "LOGIN_SUCCESSFUL", data: res.data.token })})
      .catch(err => dispatch({ type: "LOGIN_ERROR", data: err }));
  };
};

export const logout = () => {
  authAxios = null;
  return { type: "LOGOUT_SUCCESSFUL" };
};

// TODO: use an axios variable with headers to pass token
export const loadCurrentActions = () => {
  return dispatch => {
    axios
      .get("/api/currentActions")
      .then(res => dispatch({ type: "CURRENTACTIONS_LOADED", data: res.data }))
      .catch(err => console.error(err));
  };
};

// TODO: use an axios variable with headers to pass token
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

// TODO: use an axios variable with headers to pass token
export const loadActivities = () => {
  return dispatch => {
    axios
      .get("/api/activities")
      .then(res => dispatch({ type: "ACTIVITIES_LOADED", data: res.data }))
      .catch(err => console.error(err));
  };
};

// TODO: use an axios variable with headers to pass token
export const startAction = activityTitle => {
  if (!activityTitle)
  const obj = {
    activityTitle,
    startDate: moment().format("Y-MM-DD"),
    startTime: moment().format("HH:mm:ssZ")
  };
  return dispatch =>
    axios
      .post("/api/currentTimers/start", obj)
      .then(res => dispatch({ type: "ACTION_STARTED", data: res.data }))
      .catch(err => console.error(err));
};

// TODO: use an axios variable with headers to pass token
// TODO: Talk with Michael about what the API returns (assuming the new action)
export const endAction = id => {
  if (!id) return;
  return dispatch =>
    axios
      .get(`/api/currentTimers/end/${id}`)
      .then(res => dispatch({ type: "ACTION_ENDED", data: res.data, id }))
      .catch(err => console.error(err));
};

// TODO: use an axios variable with headers to pass token
export const deleteCurrentAction = id => {
  if(!id) return;
  return dispatch =>
    axios
      .delete(`/api/currentTimers/${id}`)
      .then(res => dispatch({ type: "CURRENTACTION_DELETED", id }))
      .catch(err => console.error(err));
};

// TODO: use an axios variable with headers to pass token
export const deleteHistoricalAction = id => {
  if(!id) return;
  return dispatch =>
    axios
      .delete(`/api/historicalActions/${id}`)
      .then(res => dispatch({ type: "HISTORICALACTION_DELETED", id }))
      .catch(err => console.error(err));
};

// TODO: use an axios variable with headers to pass token
export const addActivity = (title, description = "") => {
  if (!title) return;
  const obj = { title };
  if (description) obj.description = description;
  return dispatch =>
    axios
      .post("/api/activity")
      .then(res => dispatch({ type: "ACTIVITY_ADDED", data: res.data }))
      .catch(err => console.error(err));
};

// TODO: use an axios variable with headers to pass token
export const deleteActivity = id => {
  if (!id) return;
  return dispatch =>
    axios
      .delete(`/api/activity/${id}`)
      .then(res => dispatch({ type: "ACTIVITY_DELETED", id }))
      .catch(err => console.error(err));
};
