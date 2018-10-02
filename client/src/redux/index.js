import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const isAuthenticated = (prev = false, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESSFUL":
      return true;
    default:
      return prev;
  }
};

const reducer = combineReducers({isAuthenticated})

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__ || compose;
export default createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
