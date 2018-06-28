import { combineReducers } from "redux";

// ##############################
// // // Actions
// #############################
import {
  addNotification,
  removeNotification
} from "./Actions/notificationActions";

// ##############################
// // // Reducers
// #############################
import notificationsReducer from "./Reducers/notificationsReducer.jsx";

// ##############################
// // // Root Reducer
// #############################
export default combineReducers({
  notifications: notificationsReducer
});

export {
  // Actions
  addNotification,
  removeNotification,
  // Reducers
  notificationsReducer
};
