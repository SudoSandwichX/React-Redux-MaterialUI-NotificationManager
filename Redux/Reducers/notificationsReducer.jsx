import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from "../Actions/notificationActions.jsx";
import update from "immutability-helper";

let initialState = [];

// compare previous state to new state and update accordingly.
export default function notificationsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case ADD_NOTIFICATION:
      /* // add to front of array. Causes jittering
      let newArray = state.slice();
      newArray.splice(0, 0, {
        id: payload.notification.id,
        message: payload.notification.message,
        open: payload.notification.open,
        color: payload.notification.color,
        icon: payload.notification.icon
      });
      return newArray;
*/
      return update(state, {
        $push: [
          {
            id: payload.notification.id,
            message: payload.notification.message,
            open: payload.notification.open,
            color: payload.notification.color,
            icon: payload.notification.icon
          }
        ]
      });

    case REMOVE_NOTIFICATION:
      const index = state.indexOf(payload.notification);
      // Alt: state.findIndex(obj => obj.id === payload.notification.id)
      if (index >= 0) {
        return update(state, { $splice: [[index, 1]] });
      }
      break;
    default:
      return state;
  }
}
