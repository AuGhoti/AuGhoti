import axios from "axios";
import moment from "moment";

let authAxios = axios.create();

authAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const init = dispatch => {
  loadCurrentActions(dispatch);
  loadHistoricalActions(dispatch);
  loadActivities(dispatch);
  dispatch({
    type: "INIT"
  });
};

export const verify = () => {
  return dispatch => {
    if (localStorage.getItem("token")) {
      init(dispatch);
      dispatch({ type: "VERIFY" });
    }
  };
};

export const login = ({ username, password }) => {
  if (!username || !password)
    return {
      type: "AUTH_ERROR",
      data: "Username and password required"
    };
  return dispatch => {
    axios
      .post("/auth/login", {
        username,
        password
      })
      .then(res => {
        dispatch({
          type: "LOGIN_SUCCESSFUL",
          data: res.data
        });
      })
      .then(init(dispatch))
      .catch(err => console.err(err));
  };
};

export const signup = ({ username, password }) => {
  if (!username || !password)
    return {
      type: "LOGIN_ERROR",
      data: "Username and password required"
    };
  return dispatch => {
    axios
      .post("/auth/signup", {
        username,
        password
      })
      .then(res => {
        init(dispatch);
        dispatch({
          type: "LOGIN_SUCCESSFUL",
          data: res.data
        });
      })
      .catch(err => console.log(err));
  };
};

export const logout = () => {
  return {
    type: "LOGOUT_SUCCESSFUL"
  };
};

export const loadCurrentActions = dispatch => {
  return authAxios
    .get("/api/current")
    .then(res =>
      dispatch({
        type: "CURRENTACTIONS_LOADED",
        data: res.data
      })
    )
    .catch(err => console.log(err));
};

export const loadHistoricalActions = dispatch => {
  return authAxios
    .get("/api/historical")
    .then(res =>
      dispatch({
        type: "HISTORICALACTIONS_LOADED",
        data: res.data
      })
    )
    .catch(err => console.log(err));
};

export const loadActivities = dispatch => {
  return authAxios
    .get("/api/activity")
    .then(res => {
      return dispatch({
        type: "ACTIVITIES_LOADED",
        data: res.data
      });
    })
    .catch(err => console.log(err));
};

export const startAction = (activityTitle, description = "") => {
  const obj = {
    activityTitle,
    startDate: moment().format("Y-MM-DD"),
    startTime: moment().format("HH:mm:ssZ")
  };
  return dispatch =>
    authAxios
      .post("/api/current/start", obj)
      .then(res =>
        dispatch({
          type: "ACTION_STARTED",
          data: res.data
        })
      )
      .catch(err => console.log(err));
};

export const endAction = id => {
  if (!id) return;
  return dispatch =>
    authAxios
      .get(`/api/current/end/${id}`)
      .then(res =>
        dispatch({
          type: "ACTION_ENDED",
          data: res.data,
          id
        })
      )
      .catch(err => console.log(err));
};

export const deleteCurrentAction = id => {
  if (!id) return;
  return dispatch =>
    authAxios
      .delete(`/api/current/${id}`)
      .then(res =>
        dispatch({
          type: "CURRENTACTION_DELETED",
          id
        })
      )
      .catch(err => console.log(err));
};

export const deleteHistoricalAction = id => {
  if (!id) return;
  return dispatch =>
    authAxios
      .delete(`/api/historical/${id}`)
      .then(res =>
        dispatch({
          type: "HISTORICALACTION_DELETED",
          id
        })
      )
      .catch(err => console.log(err));
};

export const addActivity = (title, description = "") => {
  if (!title) return;
  const obj = {
    title
  };
  if (description) obj.description = description;
  return dispatch =>
    authAxios
      .post("/api/activity", obj)
      .then(res =>
        dispatch({
          type: "ACTIVITY_ADDED",
          data: res.data
        })
      )
      .catch(err => console.log(err));
};

export const deleteActivity = id => {
  if (!id) return;
  return dispatch =>
    authAxios
      .delete(`/api/activity/${id}`)
      .then(res =>
        dispatch({
          type: "ACTIVITY_DELETED",
          id
        })
      )
      .catch(err => console.log(err));
};
