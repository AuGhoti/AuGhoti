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

const styles = theme => ({
  root: { justify: "space-between" }
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
    const { classes, theme } = this.props;
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
          <Toolbar className={classes.root}>
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={this.handleDrawerToggle}
            >
              <MenuRounded />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              AuGhoti
            </Typography>
            <Button onClick={this.handleLoginout} color="inherit">
              {this.props.isAuthenticated ? "Logout" : "Login"}
            </Button>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
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

export default withStyles(styles)(
  connect(
    state => state,
    {}
  )(Nav)
);
