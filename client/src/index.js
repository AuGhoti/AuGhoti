import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AppAlt from "./AppAlt";
import registerServiceWorker from "./registerServiceWorker";
import store from "./redux";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppAlt />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
