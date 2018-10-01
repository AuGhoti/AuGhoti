const express = require("express");
const moment = require("moment");
const timers = express.Router();
const Timer = require("../models/CurrentAction");
const Action = require("../models/HistoricalAction");

// Get all of a users timers
timers.route("/").get((req, res) => {
  Timer.find({ user: req.user._id }, (err, tmrs) => {
      if (err) return res.status(500).send(err);
      return res.send(tmrs)
  })
});

// Get or modify specific timers by their unique ID
timers
  .route("/:id")
  .get((req, res) => {
    Timer.findOne({ _id: req.params.id, user: req.user._id }, (err, timer) => {
      if (err) return res.status(500).send(err);
      if (!timer) return res.status(404).send("No timer found");
      return res.send(timer);
    });
  })
  .put((req, res) => {
    Timer.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true },
      (err, timer) => {
        if (err) return res.status(404).send(err);
        return res.send(timer);
      }
    );
  })
  .delete((req, res) => {
    Timer.findOneAndRemove(
        { _id: req.params.id, user: req.user._id },
        (err, _) => {
            if (err) return res.status(404).send(err);
            return res.status(204).send();
        });
  });

// Ends a timer and stores the information in the historical actions table
timers.route("/end/:id").get((req, res) => {
  Timer.findOneAndRemove({ _id: req.params.id, user: req.user._id }, (err, timer) => {
    if (err) return res.status(404).send();
    delete timer._doc._id;
    const newAction = new Action({ ...timer._doc, endTime: moment() });
    newAction.save((err, action) => {
      if (er) return res.status(500).send(err);
      return res.send(action);
    });
  });
});

module.exports = timers;