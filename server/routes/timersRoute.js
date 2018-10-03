const express = require("express");
const moment = require("moment");
const timers = express.Router();
const CurrentAction = require("../models/CurrentAction");
const HistoricalAction = require("../models/HistoricalAction");

// Get all of a users timers
timers.route("/").get((req, res) => {
  console.log(req);
  CurrentAction.find({ userId: req.user._id }, (err, tmrs) => {
      if (err) return res.status(500).send(err);
      return res.send(tmrs)
  })
});

// Get or modify specific timers by their unique ID
timers
  .route("/:id")
  .get((req, res) => {
    CurrentAction.findOne({ _id: req.params.id, userId: req.user._id }, (err, timer) => {
      if (err) return res.status(500).send(err);
      if (!timer) return res.status(404).send("No timer found");
      return res.send(timer);
    });
  })
  .put((req, res) => {
    CurrentAction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true },
      (err, timer) => {
        if (err) return res.status(404).send(err);
        return res.send(timer);
      }
    );
  })
  .delete((req, res) => {
    CurrentAction.findOneAndRemove(
        { _id: req.params.id, userId: req.user._id },
        (err, _) => {
            if (err) return res.status(404).send(err);
            return res.status(204).send();
        });
  });

// Starts a timer and stores the information in the current actions table
timers.route("/start").post((req, res) => {
  const startDate = moment().format("YYYY-MM-DD");
  const startTime = moment().format("hh:mm:ssz");
  const newTimer = new CurrentAction({ title: req.body.title, startDate, startTime, userId: req.user._id });
  delete newTimer._id;
  newTimer.save((err, timer) => {
    if (err) return res.status(404).send(err);
    return res.send(timer);
  })
});

// Ends a timer and stores the information in the historical actions table
timers.route("/end/:id").get((req, res) => {
  CurrentAction.findOneAndRemove({ _id: req.params.id, userId: req.user._id }, (err, timer) => {
    if (err) return res.status(404).send();
    delete timer._doc._id;
    const date = moment().format("YYYY-MM-DD");
    const time = moment().format("hh:mm:ssz");
    const newAction = new HistoricalAction({ ...timer._doc, endDate: date, endTime: time, userId: req.user._id });
    newAction.save((err, action) => {
      if (err) return res.status(500).send(err);
      return res.send(action);
    });
  });
});

module.exports = timers;