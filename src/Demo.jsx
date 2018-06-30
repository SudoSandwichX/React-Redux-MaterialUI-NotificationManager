import { addNotification, removeNotification } from "../Redux";
import React from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { AddAlert, Message } from "@material-ui/icons";
import NotificationManager from "../Components/NotificationManager.jsx";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: "500px",
    margin: "auto"
  },
  formControl: {
    margin: theme.spacing.unit,
    marginTop: "16px",
    minWidth: "100px"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit
  },
  textField: {
    minWidth: "200px"
  }
});

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.showNotification = this.showNotification.bind(this);
  }
  state = {
    message: "I'm a notification :-)",
    color: "",
    icon: "alert"
  };

  handleChange = name => event => {
    console.log(name + " " + event.target.value);
    this.setState({
      [name]: event.target.value
    });
  };
  showNotification = notification => {
    console.log(notification.icon);
    this.props.onAddNotification({
      id: Date.now(),
      message: notification.message,
      open: true,
      color: notification.color,
      icon: notification.icon === "alert" ? AddAlert : Message
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <form noValidate autoComplete="off" className={classes.root}>
          <TextField
            id="message"
            label="Message"
            value={this.state.message}
            onChange={this.handleChange("message")}
            margin="normal"
          />

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="color-simple">Type</InputLabel>
            <Select
              value={this.state.color}
              onChange={this.handleChange("color")}
              inputProps={{
                name: "color",
                id: "color-simple"
              }}
            >
              <MenuItem value="" />
              <MenuItem value="info">info</MenuItem>
              <MenuItem value="success">success</MenuItem>
              <MenuItem value="danger">danger</MenuItem>
              <MenuItem value="warning">warning</MenuItem>
              <MenuItem value="primary">primary</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="icon-simple">icon</InputLabel>
            <Select
              value={this.state.icon}
              onChange={this.handleChange("icon")}
              inputProps={{
                name: "icon",
                id: "icon-simple"
              }}
            >
              <MenuItem value="alert">Alert</MenuItem>
              <MenuItem value="message">Message</MenuItem>
            </Select>
          </FormControl>
        </form>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            this.showNotification({
              message: this.state.message,
              color: this.state.color,
              icon: this.state.icon
            })
          }
        >
          Show Notification
        </Button>
        <NotificationManager />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapActionsToProps = {
  onAddNotification: addNotification,
  onRemoveNotification: removeNotification
};

Demo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapActionsToProps)
)(Demo);
