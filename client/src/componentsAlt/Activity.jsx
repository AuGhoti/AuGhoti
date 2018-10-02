import React, { Component } from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// components
import ActivityItem from './ActivityItem'

const dummyAct = [
    {
        title: "coding",
        description: "full stack"
    },
    {
        title: "eating",
        description: "burrito city"
    },
    {
        title: "exercise",
        description: "weight-lifting"
    },
    {
        title: "halo",
        description: "slaying bodies"
    }
]

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      color: "#b2bec3"
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
});

class Activity extends Component {
    constructor() {
        super()

        this.state = {
            activity: "",
            description: "",
        }
    }

    handleChange = name => e => {
        this.setState({[name]: e.target.value})
    }
    
    render(){
        const displayAct = dummyAct.map((act, i) => {
            return <ActivityItem key={i} i={i} {...act}/>
        })

        const { classes } = this.props;

        return (
            <div id="current-action-wrapper">
                <h1 className="page-title">activities</h1>
                <form id="current-action-select">
                    <TextField 
                        id="standard-description"
                        label="New activity"
                        className={classes.textField}
                        value={this.state.activity}
                        onChange={this.handleChange('activity')}
                        margin="normal"
                    />
                    <TextField
                        id="standard-description"
                        label="Description"
                        className={classes.textField}
                        value={this.state.description}
                        onChange={this.handleChange('description')}
                        margin="normal"
                    />
                    <div className="start-action-btn">
                        <Button onClick="">Start</Button>
                    </div>
                </form>
                <h3 className="current-actions-title">Activities</h3>
                <div className="activities-container">
                    {displayAct}
                </div>
            </div>
            
        )
    }
}

Activity.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Activity)