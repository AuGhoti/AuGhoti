const express = require("express");
const app = express();
const moment = require("moment");

const Current = require("../models/CurrentAction");
const Historical = require("../models/HistoricalAction");
const Activities = require("../models/Activity");

app.route("/").get((req, res) => {
  const result = {};
  const { userId } = req.user;
  console.log(req.user._id);
  if (req.query && req.query.count) {
    result.counts = {};
    switch (req.query.count) {
      case "today":
        result.counts.today = 0;
        Promise.all([
          Current.find({
            startDate: moment().format("Y-MM-DD"),
            userId
          })
            .estimatedDcoumentCount()
            .exec(),
          Historical.find({
            endDate: moment().format("Y-MM-DD"),
            userId
          })
            .estimatedDcoumentCount()
            .exec()
        ]).then(res => (result.counts.today += res[0] + res[1]));
        break;
      case "month":
        result.counts.month = 0;
        Current.find({
          startDate: { $month: new Date() },
          userId
        })
          .count()
          .exec()
          .then(res => (result.counts.month += res));
        Historical.find({
          endDate: { $month: new Date() },
          userId
        })
          .count()
          .exec()
          .then(res => (result.counts.month += res));
    }
  }
  res.status(200).send(result);
});

module.exports = app;
