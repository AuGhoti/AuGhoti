import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import logo from '../images/au.svg'

// components 
import Current from './Current'

const styles = {
    list: {
      width: 250,
      marginLeft: 10,
    }
  };
  
  class Main extends Component {
    state = {
      left: false
    };
  
    toggleDrawer = (side, open) => () => {
      this.setState({
        [side]: open,
      });
    };
  
    render() {
      const { classes } = this.props;
  
      const sideList = (
        <div className={classes.list} id="drawer-items">
          <Link to="/"><List>dashboard</List></Link>
          <Divider style={{marginLeft: "-10px"}}/>
          <Link to="/current"><List>current</List></Link>
          <Link to="/activity"><List>activities</List></Link>
          <Link to="/history"><List>history</List></Link>
          <Link to="/statistics"><List>statistics</List></Link>
          <button onClick={this.props.handleLogout}><List>logout</List></button>
        </div>
      );  

      return (
        <div>
          <div id="main-nav">
            <img className="main-nav-logo" src={logo} />
            <Button className="menu-btn" style={{color: "#b2bec3"}} onClick={this.toggleDrawer('left', true)}><MenuIcon /></Button>
            <SwipeableDrawer
                      open={this.state.left}
                      onClose={this.toggleDrawer('left', false)}
                      onOpen={this.toggleDrawer('left', true)}>
              <div
                id="main-drawer"
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('left', false)}
                onKeyDown={this.toggleDrawer('left', false)}
              >
                {sideList}
            </div>
          </SwipeableDrawer>
          </div>
          <Current />
        </div>
      );
    }
  }
  
Main.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);