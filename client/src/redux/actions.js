import axios from "axios";
import moment from "moment";

//TODO: add token to headers, use those in requests requiring authentication
const authAxios = axios.create();
authAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`
  return config;
})

const init = () => {
  loadCurrentActions();
  loadHistoricalActions();
  loadActivities();
  return { type: "INIT" };
};

export const login = ({ username, password }) => {
  if (!username || !password)
    return { type: "AUTH_ERROR", data: "Username and password required" };
  return dispatch => {
    axios
      .post("/auth/login", { username, password })
      //TODO: set authAxios here to include the token in the header
      .then(res => {
        init();
        dispatch({ type: "LOGIN_SUCCESSFUL", data: res.data });
      })
      .catch(err => console.err(err));
  };
};

export const signup = ({ username, password }) => {
  if (!username || !password)
    return { type: "LOGIN_ERROR", data: "Username and password required" };
  return dispatch => {
    axios
      .post("/auth/signup", { username, password })
      //TODO: set authAxios here to include the token in the header
      .then(res => {
        init();
        dispatch({ type: "LOGIN_SUCCESSFUL", data: res.data });
      })
      .catch(err => console.error(err));
  };
};

export const logout = () => {
  return { type: "LOGOUT_SUCCESSFUL" };
};

// TODO: use an axios variable with headers to pass token
export const loadCurrentActions = () => {
  return dispatch => {
    authAxios
      .get("/api/currentActions")
      .then(res => dispatch({ type: "CURRENTACTIONS_LOADED", data: res.data }))
      .catch(err => console.error(err));
  };
};

// TODO: use an authAxios variable with headers to pass token
export const loadHistoricalActions = () => {
  return dispatch => {
    authAxios
      .get("/api/historicalActions")
      .then(res =>
        dispatch({ type: "HISTORICALACTIONS_LOADED", data: res.data })
      )
      .catch(err => console.error(err));
  };
};

// TODO: use an authAxios variable with headers to pass token
export const loadActivities = () => {
  return dispatch => {
    authAxios
      .get("/api/activities")
      .then(res => dispatch({ type: "ACTIVITIES_LOADED", data: res.data }))
      .catch(err => console.error(err));
  };
};

// TODO: use an authAxios variable with headers to pass token
export const startAction = (activityTitle, description = "") => {
  let obj = {};
  if (!activityTitle)
    obj = {
      activityTitle,
      startDate: moment().format("Y-MM-DD"),
      startTime: moment().format("HH:mm:ssZ")
    };
  return dispatch =>
    authAxios
      .post("/api/currentTimers/start", obj)
      .then(res => dispatch({ type: "ACTION_STARTED", data: res.data }))
      .catch(err => console.error(err));
};

// TODO: use an authAxios variable with headers to pass token
// TODO: Talk with Michael about what the API returns (assuming the new action)
export const endAction = id => {
  if (!id) return;
  return dispatch =>
    authAxios
      .get(`/api/currentTimers/end/${id}`)
      .then(res => dispatch({ type: "ACTION_ENDED", data: res.data, id }))
      .catch(err => console.error(err));
};

// TODO: use an authAxios variable with headers to pass token
export const deleteCurrentAction = id => {
  if (!id) return;
  return dispatch =>
    authAxios
      .delete(`/api/currentTimers/${id}`)
      .then(res => dispatch({ type: "CURRENTACTION_DELETED", id }))
      .catch(err => console.error(err));
};

// TODO: use an authAxios variable with headers to pass token
export const deleteHistoricalAction = id => {
  if (!id) return;
  return dispatch =>
    authAxios
      .delete(`/api/historicalActions/${id}`)
      .then(res => dispatch({ type: "HISTORICALACTION_DELETED", id }))
      .catch(err => console.error(err));
};

// TODO: use an authAxios variable with headers to pass token
export const addActivity = (title, description = "") => {
  if (!title) return;
  const obj = { title };
  if (description) obj.description = description;
  return dispatch =>
    authAxios
      .post("/api/activity")
      .then(res => dispatch({ type: "ACTIVITY_ADDED", data: res.data }))
      .catch(err => console.error(err));
};

// TODO: use an authAxios variable with headers to pass token
export const deleteActivity = id => {
  if (!id) return;
  return dispatch =>
    authAxios
      .delete(`/api/activity/${id}`)
      .then(res => dispatch({ type: "ACTIVITY_DELETED", id }))
      .catch(err => console.error(err));
};
