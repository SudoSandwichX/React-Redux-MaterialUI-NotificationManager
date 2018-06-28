import React from "react";
import ReactDOM from "react-dom";
import Demo from "./Demo.jsx";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "../Reducers";
import "./styles.css";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

const Root = ({ store }) => (
  <Provider store={store}>
    <React.Fragment>
      <div className="App">
        <h1>Notification Demo</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
      <Demo />
    </React.Fragment>
  </Provider>
);

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
