import React from "react";
import ReactDOM from "react-dom";
import Demo from "./Demo.jsx";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "../Redux";
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
        <p> Expand and contract window to see how notification responds</p>
        <Demo />
      </div>
    </React.Fragment>
  </Provider>
);

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
