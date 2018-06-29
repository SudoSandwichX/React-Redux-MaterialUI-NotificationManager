import React from "react";
import { AddAlert } from "@material-ui/icons";
import Snackbar from "./Snackbar.jsx";
import { connect } from "react-redux";
import { addNotification, removeNotification } from "../Redux";
import { List, ListItem, ListItemText, Paper } from "@material-ui/core/";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
// this will store the notifications and their count to track them and also maxNotifications for use in internal functions

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

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
    const { classes } = this.props;
    return (
      <React.Fragment>
        {this.props.notifications.length > 0 && (
          <List style={classes.style}>
            {this.props.notifications.map(notification => {
              return (
                <Paper zDepth={1} transitionEnabled={false}>
                  <ListItem
                    button
                    onClick={() => this.closeNotification(notification.id)}
                    onTouchTap={() => this.closeNotification(notification.id)}
                  >
                    <ListItemText primary={notification.message} />
                  </ListItem>
                </Paper>
              );
            })}
          </List>
        )}
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
  withStyles(styles),
  connect(mapStateToProps, mapActionsToProps)
)(NotificationManager);

/*
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
                    */
