import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import moment from 'moment'

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

class History extends Component {
  state = {
    expanded: null
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    const showSorted = []
    const displaySortedDates = obj => {
      for(let key in obj) {
        showSorted.push(<h1 key={key}>{key}</h1>)
        let ptr = obj[key]
        for(let i = 0; i < ptr.length; i++) {
          let his = ptr[i]
          showSorted.push(
            <ExpansionPanel
              key={i}
              expanded={expanded === `panel${i + 1}`}
              onChange={this.handleChange(`panel${i + 1}`)}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  {his.activityTitle}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                {`${moment(his.endDate + "T" + his.endTime).to(moment(his.startDate + "T" + his.startTime), true)} ${his.endDate}`}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className="history-expansion-panels">
                  <Typography>description: {his.description}</Typography>
                  <Typography>
                    time started: {his.startTime} @ {his.startDate}
                  </Typography>
                  <Typography>
                    time completed: {his.endTime} @ {his.endDate}
                  </Typography>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        }
      }
    }
    displaySortedDates(this.props.sortedDates.actions)
    return (
      <div id="history-wrapper">
        <h1 className="page-title">history</h1>
        <div className={classes.root} id="history-container">
          {showSorted}
        </div>
      </div>
    );
  }
}

History.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  state => ({ 
    historicalActions: state.historicalActions,
    sortedDates: state.sortedDates
  }),
  {}
)(withStyles(styles)(History));
