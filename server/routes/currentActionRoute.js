const express = require("express");
const actions = express.Router();
const CurrentAction = require("../models/HistoricalAction");

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
    CurrentAction.findOne({ _id: req.params.id, userId: req.user._id }, (err, activity) => {
      if (err) return res.status(404).send(err);
      return res.send(activity);
    });
  })
  .put((req, res) => {
    CurrentAction.findOneAndUpdate(
      {_id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true },
      (err, activity) => {
        if (err) res.status(404).send(err);
        else res.send(activity);
      }
    );
  })
  .delete((req, res) => {
    CurrentAction.findOneAndRemove({ _id: req.params.id, userId: req.user._id }, err => {
      if (err) res.status(404).send(err);
      else res.status(204).send();
    });
  });

module.exports = actions;