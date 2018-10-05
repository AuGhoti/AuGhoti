import React, { Component } from "react";
import StopIcon from "@material-ui/icons/Stop";
import Button from "@material-ui/core/Button";
import moment from "moment";
import { connect } from "react-redux";
import { endAction } from "../redux/actions";

class CurrentActionItem extends Component {
  style = {
    oddStyle: {
      backgroundColor: "#6f7d81"
    },
    evenStyle: {
      backgroundColor: "#636e72"
    }
  };

  state = {
    diff: ""
  };

  timer = null;

  componentDidMount() {
    this.updateTimer();
    this.timer = setInterval(this.updateTimer, 5000);
  }

  updateTimer = () => {
    this.setState({
      diff: moment(this.props.startDate + "T" + this.props.startTime).fromNow(
        true
      )
    });
  };

  render() {
    return (
      <div
        className="current-action-card"
        style={
          this.props.i % 2 === 0 ? this.style.evenStyle : this.style.oddStyle
        }
      >
        <div className="current-action-context">
          <h3>{this.props.activityTitle}</h3>
          <h4>{this.props.description}</h4>
        </div>
        <div className="current-action-timer">
          <h3>{this.props.startDate}</h3>
          <h1>{this.state.diff}</h1>
          <Button
            variant="fab"
            className="btn-stop"
            onClick={() => this.props.endAction(this.props._id)}
          >
            <StopIcon />
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { endAction }
)(CurrentActionItem);
