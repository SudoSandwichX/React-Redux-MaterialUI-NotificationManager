import React from "react";
import { AddAlert } from "@material-ui/icons";
import Snackbar from "./Snackbar.jsx";
import { connect } from "react-redux";
import { addNotification, removeNotification } from "../Redux";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
// this will store the notifications and their count to track them and also maxNotifications for use in internal functions
import snackbarContentStyle from "../Assets/jss/snackbarContentStyle.jsx";

class NotificationManager extends React.Component {
  constructor(props) {
    super(props);
    this.closeNotification = this.closeNotification.bind(this);
  }
  componentDidMount() {
    console.log(this.props.notifications);
  }

  closeNotification(id) {
    let notification = this.props.notifications.find(x => x.id === id);
    this.props.onRemoveNotification(notification);
    console.log(`Close Note ${notification.id}`);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.notifications.length > 0 &&
          this.props.notifications.map(notification => {
            return (
              <Snackbar
                id={notification.id}
                place="br"
                color="info"
                icon={AddAlert}
                message={notification.message}
                open={notification.open}
                closeNotification={this.closeNotification}
                close
              />
            );
          })}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications
});

const mapActionsToProps = {
  onAddNotification: addNotification,
  onRemoveNotification: removeNotification
};

NotificationManager.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(snackbarContentStyle),
  connect(mapStateToProps, mapActionsToProps)
)(NotificationManager);
