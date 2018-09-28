import React, { Component } from "react";
import { connect } from "react-redux";
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
  Drawer
} from "@material-ui/core";
import { MenuRounded } from "@material-ui/icons";

const style = {};

class Nav extends Component {
  state = { mobileOpen: false };

  handleDrawerToggle = () => {
    this.setState(prev => ({ mobileOpen: !prev.mobileOpen }));
  };

  handleLoginout = e => {
    console.log("clicked login/logout");
  };

  render() {
    const drawer = (
      <div>
        <List>item</List>
        <Divider />
        <List>another item</List>
      </div>
    );
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <IconButton aria-label="Menu">
              <MenuRounded />
            </IconButton>
            <Typography>AuGhoti</Typography>
            <Button onClick={this.handleLoginout}>
              {this.props.isAuthenticated ? "Logout" : "Login"}
            </Button>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="right"
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer variant="permanent" open>
            {drawer}
          </Drawer>
        </Hidden>
      </React.Fragment>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default withStyles(style)(
  connect(
    state => state,
    {}
  )(Nav)
);
