import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  withStyles,
  AppBar,
  Typography,
  Button,
  IconButton,
  Toolbar,
  List,
  Divider,
  Hidden,
  Drawer,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { MenuRounded } from "@material-ui/icons";

const drawerWidth = 250;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    height: 64,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  drawer: {
    width: drawerWidth
  },
  appBar: {
    position: "absolute",
    marginLeft: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  toolbar: theme.mixins.toolbar
});

class Nav extends Component {
  state = { mobileOpen: false };

  handleDrawerToggle = () => {
    this.setState(prev => ({ mobileOpen: !prev.mobileOpen }));
  };

  handleLoginout = e => {
    console.log("clicked login/logout");
  };

  render() {
    const { classes } = this.props;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List component="nav">
          {this.props.isAuthenticated ? (
            <React.Fragment>
              <ListItem
                component={Link}
                to="/dashboard"
                style={{ textDecoration: "none" }}
              >
                <ListItemText>Dashboard</ListItemText>
              </ListItem>
              <ListItem
                component={Link}
                to="/current"
                style={{ textDecoration: "none" }}
              >
                <ListItemText>Current</ListItemText>
              </ListItem>
              <ListItem
                component={Link}
                to="/past"
                style={{ textDecoration: "none" }}
              >
                <ListItemText>Past</ListItemText>
              </ListItem>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ListItem
                component={Link}
                to="/"
                style={{ textDecoration: "none" }}
              >
                <ListItemText>Home</ListItemText>
              </ListItem>
              <ListItem
                component={Link}
                to="/about"
                style={{ textDecoration: "none" }}
              >
                <ListItemText>About</ListItemText>
              </ListItem>
            </React.Fragment>
          )}
        </List>
      </div>
    );
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={this.handleDrawerToggle}
            >
              <MenuRounded />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              noWrap
              className={classes.grow}
            >
              [Au]ghoti
            </Typography>
            {this.props.isAuthenticated ? (
              <div>
                <Button onClick={this.handleLogout} color="inherit">
                  Logout
                </Button>
              </div>
            ) : (
              <div>
                <Button onClick={this.handleSignup} color="inherit">
                  Sign Up
                </Button>
                <Button onClick={this.handleLogin} color="inherit">
                  Login
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            classes={{ paper: classes.drawer }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer variant="permanent" classes={{ paper: classes.drawer }} open>
            {drawer}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default withStyles(styles)(
  connect(
    state => state,
    {}
  )(Nav)
);
