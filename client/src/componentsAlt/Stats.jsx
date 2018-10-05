import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

// components
import LineChart from './LineChart'
import BarChart from './BarChart'
import PieChart from './PieChart'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
});


class Stats extends Component {
  constructor() {
    super();

        this.state = {
            chartData: {},
            value: 0,
        }
    }
    
    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };
    
    componentDidMount = () => {
        this.getChartData()
    }

  componentDidMount = () => {
    this.getChartData();
  };

  getChartData() {
    // let temp = this.props.historicalActions.actions.map(activity => {

    //     let time = moment(activity.endDate + "T" + activity.endTime).to(moment(activity.startDate + "T" + activity.startTime), true)
    //     return this.isNumber(time)
    // })

    let totalData = !this.props.historicalActions
      ? [{ title: "", time: 0 }]
      : this.props.historicalActions.actions.map(activity => {
          return {
            title: activity.activityTitle,
            time: this.isNumber(
              moment(activity.endDate + "T" + activity.endTime).to(
                moment(activity.startDate + "T" + activity.startTime),
                true
              )
            )
          };
        });

        this.setState({
            chartData: {
                labels: [...resultTitle],
                datasets: [
                    {
                        label: "LEGEND",
                        data: [...resultTimes],
                        backgroundColor: [
                            `#eccc68`,
                            `#ff7f50`,
                            `#ff6b81`,
                            `#7bed9f`,
                            `#70a1ff`,
                            `#5352ed`,
                            `#dfe4ea`,
                            `#ffa502`,
                            `#ff6348`,
                            `#ff4757`,
                            `#2ed573`,
                            `#1e90ff`,
                            `#3742fa`,
                        ]
                    }
                ]
            }
        })
    }
    // console.log(resultTimes)

    this.setState({
      chartData: {
        labels: [...resultTitle],
        datasets: [
          {
            label: "test1",
            data: [...resultTimes],
            backgroundColor: [
              `#eccc68`,
              `#ff7f50`,
              `#ff6b81`,
              `#7bed9f`,
              `#70a1ff`,
              `#5352ed`,
              `#dfe4ea`,
              `#ffa502`,
              `#ff6348`,
              `#ff4757`,
              `#2ed573`,
              `#1e90ff`,
              `#3742fa`
            ]
          }
        ]
      }
    });
  }

    render() {
        const { classes, theme } = this.props;
        return (
            <div id="current-action-wrapper">
                <h1 className="page-title">analytics</h1>
                <div>
                    
                    
                    
                </div>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                    >
                        <Tab label="Pie Chart" />
                        <Tab label="Bar Chart" />
                        <Tab label="Line Chart" />
                    </Tabs>
                    </AppBar>
                    <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                    >
                    <TabContainer dir={theme.direction}><PieChart {...this.state} legendPosition="right" chartTitle="Activity Breakdown" /></TabContainer>
                    <TabContainer dir={theme.direction}><BarChart {...this.state} legendPosition="bottom" chartTitle="Activity Breakdown" /></TabContainer>
                    <TabContainer dir={theme.direction}><LineChart {...this.state} legendPosition="bottom" chartTitle="Activity Breakdown" /></TabContainer>
                    </SwipeableViews>
            </div>
        )
    }
    return map;
  };
  isNumber = str => {
    let arr = str.split(" ");
    let results = {
      time: parseInt(arr[0], 10),
      format: arr[1]
    };
    return results;
  };

  render() {
    return (
      <div id="current-action-wrapper">
        <h1 className="page-title">analytics</h1>
        <div>
          <PieChart
            {...this.state}
            legendPosition="right"
            chartTitle="Pie Chart"
          />
          <LineChart
            {...this.state}
            legendPosition="left"
            chartTitle="Line Graph"
          />
          <BarChart
            {...this.state}
            legendPosition="bottom"
            chartTitle="Bar Graph"
          />
        </div>
      </div>
    );
  }
}

Stats.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

export default connect(state => ({
    activities: state.activities,
    currentAction: state.currentAction,
    historicalActions: state.historicalActions
}))(withStyles(styles, { withTheme: true })(Stats))
