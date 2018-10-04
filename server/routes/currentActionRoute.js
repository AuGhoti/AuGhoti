const express = require("express");
const actions = express.Router();
const moment = require("moment");
const CurrentAction = require("../models/CurrentAction");
const HistoricalAction = require("../models/HistoricalAction");

// Interactions with a user's list of actions
actions
  .route("/")
  .get((req, res) => {
    CurrentAction.find({ userId: req.user._id }, (err, activity) => {
      if (err) return res.status(500).send(err);
      return res.send(activity);
    });
  })
  .post((req, res) => {
    const newActivity = new Action(req.body);
    newActivity.userId = req.user._id;
    newActivity.save((err, activity) => {
      if (err) return res.status(500).send(err);
      return res.status(201).send(activity);
    });
  });

// Interactions with an individual activity belonging to a user
actions
  .route("/:id")
  .get((req, res) => {
    CurrentAction.findOne(
      { _id: req.params.id, userId: req.user._id },
      (err, activity) => {
        if (err) return res.status(404).send(err);
        return res.send(activity);
      }
    );
  })
  .put((req, res) => {
    CurrentAction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true },
      (err, activity) => {
        if (err) res.status(404).send(err);
        else res.send(activity);
      }
    );
  })
  .delete((req, res) => {
    CurrentAction.findOneAndRemove(
      { _id: req.params.id, userId: req.user._id },
      err => {
        if (err) res.status(404).send(err);
        else res.status(204).send();
      }
    );
  });

actions.route("/start").post((req, res) => {
  let startTime, startDate;
  console.log(req.body);
  if (!req.body.startDate) startDate = moment().format("YYYY-MM-DD");
  else startDate = req.body.startDate;
  if (!req.body.startTime) startTime = moment().format("hh:mm:ssZ");
  else startTime = req.body.startTime;
  console.log(req.body);
  const newAction = new CurrentAction({
    activityTitle: req.body.activityTitle,
    startDate,
    startTime,
    userId: req.user._id
  });
  newAction.save((err, action) => {
    if (err) return res.status(404).send(err);
    return res.send(action);
  });
});

actions.route("/end/:id").get((req, res) => {
  CurrentAction.findOneAndRemove(
    { _id: req.params.id, userId: req.user._id },
    (err, current) => {
      if (err) return res.status(404).send(err);
      console.log(current);
      delete current._doc._id;
      const endDate = moment().format("YYYY-MM-DD");
      const endTime = moment().format("hh:mm:ssz");
      const newAction = new HistoricalAction({
        ...current._doc,
        endDate,
        endTime,
        userId: req.user._id
      });
      newAction.save((err, action) => {
        if (err) return res.status(500).send(err);
        return res.send(action);
      });
    }
  );
});

module.exports = actions;
