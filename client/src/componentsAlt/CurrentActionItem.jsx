import React from "react";
import StopIcon from "@material-ui/icons/Stop";
import Button from "@material-ui/core/Button";
import moment from "moment";
import { connect } from "react-redux";
import { endAction } from "../redux/actions";

const CurrentActionItem = props => {
  const style = {
    oddStyle: {
      backgroundColor: "#6f7d81"
    },
    evenStyle: {
      backgroundColor: "#636e72"
    }
  };

  return (
    <div
      className="current-action-card"
      style={props.i % 2 === 0 ? style.evenStyle : style.oddStyle}
    >
      <div className="current-action-context">
        <h3>{props.activityTitle}</h3>
        <h4>{props.description}</h4>
      </div>
      <div className="current-action-timer">
        <h3>{props.startDate}</h3>
        <h1>{moment(props.startDate + "T" + props.startTime).fromNow(true)}</h1>
        <Button
          variant="fab"
          className="btn-stop"
          onClick={() => props.endAction(props._id)}
        >
          <StopIcon />
        </Button>
      </div>
    </div>
  );
};

export default connect(
  null,
  { endAction }
)(CurrentActionItem);
