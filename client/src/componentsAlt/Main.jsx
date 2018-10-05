import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../images/au.svg";

// components
import { logout } from "../redux/actions";

const styles = theme => ({
  list: {
    width: 250,
    marginLeft: 10
  },
  toolbar: theme.mixins.toolbar
});

class Main extends Component {
  state = {
    left: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  handleLogout = e => {
    this.props.logout();
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list} id="drawer-items">
        <div className={classes.toolbar} id="drawer-logo">
          [Au]Ghoti
        </div>
        <Divider style={{ marginLeft: "-10px" }} />
        <Link to="/">
          <List>dashboard</List>
        </Link>

        <Link to="/current">
          <List>current</List>
        </Link>

        <Link to="/activity">
          <List>activities</List>
        </Link>
        <Link to="/history">
          <List>history</List>
        </Link>
        <Link to="/analytics">
          <List>analytics</List>
        </Link>
        <button onClick={this.handleLogout} className="logout-btn">
          <List>logout</List>
        </button>
      </div>
    );

    return (
      <div>
        <div id="main-nav">
          <img className="main-nav-logo" src={logo} alt="logo" />
          <h1 id="display-username">{this.props.user}</h1>
          <Button
            className="menu-btn"
            style={{ color: "#b2bec3" }}
            onClick={this.toggleDrawer("left", true)}
          >
            <MenuIcon />
          </Button>
          <SwipeableDrawer
            open={this.state.left}
            onClose={this.toggleDrawer("left", false)}
            onOpen={this.toggleDrawer("left", true)}
          >
            <div
              id="main-drawer"
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer("left", false)}
              onKeyDown={this.toggleDrawer("left", false)}
            >
              {sideList}
            </div>
          </SwipeableDrawer>
        </div>
        {/* <Current /> */}
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  state => ({ user: state.userInfo }),
  { logout }
)(withStyles(styles)(Main));
