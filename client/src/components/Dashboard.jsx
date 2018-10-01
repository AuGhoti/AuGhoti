import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Dashboard = props => {
  if (!props.isAuthenticated) props.history.push("/");
  return <div>Dashboard</div>;
};

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export default connect(
  state => state,
  {}
)(Dashboard);
