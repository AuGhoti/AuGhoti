import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux'

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
});

// const dummyData = [
//     {
//         activityTitle: "homework",
//         description: "coding project",
//         startDate: "Oct 1, 2018",
//         endDate: "Oct 2, 2018",
//         startTime: "1:00 PM",
//         endTime: "3:00 PM"
//     },
//     {
//         activityTitle: "lunch",
//         description: "burrito city",
//         startDate: "Oct 1, 2018",
//         endDate: "Oct 3, 2018",
//         startTime: "12:00 PM",
//         endTime: "9:00 PM"
//     },
//     {
//         activityTitle: "class",
//         description: "user auth",
//         startDate: "Oct 1, 2018",
//         endDate: "Oct 4, 2018",
//         startTime: "10:00 PM",
//         endTime: "3:00 AM"
//     },
// ]

class History extends Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    const displayHis = this.props.historicalActions.map((his, i) => {
        return (
            <ExpansionPanel key={i} expanded={expanded === `panel${i+1}`} onChange={this.handleChange(`panel${i+1}`)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>{his.activityTitle}</Typography>
                    <Typography className={classes.secondaryHeading}>completed: {his.endDate}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className="history-expansion-panels">
                        <Typography>
                        description: {his.description} 
                        </Typography>
                        <Typography>
                        time started: {his.startTime} - {his.startDate} 
                        </Typography>
                        <Typography>
                        time completed: {his.endTime} - {his.endDate} 
                        </Typography>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    })

    return (
        <div id="history-wrapper">
            <h1 className="page-title">history</h1>
            <div className={classes.root} id="history-container">
                {displayHis}
            </div>
        </div>
    );
  }
}

History.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(state => ({ historicalActions: state.historicalActions }), {})(withStyles(styles)(History))