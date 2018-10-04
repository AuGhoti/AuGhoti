import React, {Component} from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { startAction } from '../redux/actions'

// components
import CurrentActionItem from './CurrentActionItem'

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

    handleSubmit = e => {
        e.preventDefault()
        const { activity, description } = this.state;
        this.props.startAction(activity, description)
    }

    activities = ["train", "eat"]

    render() {
        const displayCurrentActions = this.props.currentActions.map((data, i) => {
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
                        {this.props.activities.map(option => (
                            <MenuItem key={option._id} value={option.title}>
                            {option.title}
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
                        <Button onClick={this.handleSubmit}>Start</Button>
                    </div>
                </form>
                {displayCurrentActions}
            </div>
        )
    }
}

CurrentAction.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(state => ({ 
    currentActions: state.currentAction,
    activities: state.activities
 }), { startAction })(withStyles(styles)(CurrentAction))