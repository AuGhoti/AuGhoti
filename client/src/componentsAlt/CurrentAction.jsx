import React, {Component} from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// components
import CurrentActionItem from './CurrentActionItem'

const dummyData = [
    {
        activityTitle: "homework",
        description: "coding project",
        startDate: "Oct 1, 2018",
        startTime: "1:00 PM"
    },
    {
        activityTitle: "lunch",
        description: "burrito city",
        startDate: "Oct 1, 2018",
        startTime: "12:00 PM"
    },
    {
        activityTitle: "class",
        description: "user auth",
        startDate: "Oct 1, 2018",
        startTime: "10:00 PM"
    },
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

class CurrentAction extends Component {
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


    activities = ["train", "eat"]

    render() {
        const displayDummy = dummyData.map((data, i) => {
            return <CurrentActionItem key={i} i={i} {...data} />
        })

        const { classes } = this.props;

        return (
            <div id="current-action-wrapper">
                <h1 className="page-title">current</h1>

                <form id="current-action-select">
                    <TextField
                        id="outlined-select-activity"
                        select
                        label="Select"
                        className={classes.textField}
                        value={this.state.activity}
                        onChange={this.handleChange('activity')}
                        SelectProps={{
                            MenuProps: {
                            className: classes.menu,
                            },
                        }}
                        helperText="Please select an activity"
                        margin="normal"
                        variant="outlined"
                        >
                        {this.activities.map(option => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                    </TextField>
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
                
                {displayDummy}
            </div>
        )
    }
}

CurrentAction.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CurrentAction)