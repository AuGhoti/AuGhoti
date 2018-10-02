const express = require("express");
const activities = express.Router();
const Activity = require("../models/HistoricalActivity");

// Interactions with a user's list of activities
activities
  .route("/")
  .get((req, res) => {
    Activity.find({ user: req.user._id }, (err, activity) => {
      if (err) return res.status(500).send(err);
      return res.send(activity);
    });
  })
  .post((req, res) => {
    const newActivity = new Activity(req.body);
    newActivity.user = req.user._id;
    newActivity.save((err, activity) => {
      if (err) return res.status(500).send(err);
      return res.status(201).send(activity);
    });
  });

// Interactions with an individual activity belonging to a user
activities
  .route("/:id")
  .get((req, res) => {
    Activity.findOne({ _id: req.params.id, user: req.user._id }, (err, activity) => {
      if (err) return res.status(404).send(err);
      return res.send(activity);
    });
  })
  .put((req, res) => {
    Activity.findOneAndUpdate(
      {_id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true },
      (err, activity) => {
        if (err) res.status(404).send(err);
        else res.send(activity);
      }
    );
  })
  .delete((req, res) => {
    Activity.findOneAndRemove({ _id: req.params.id, user: req.user._id }, err => {
      if (err) res.status(404).send(err);
      else res.status(204).send();
    });
  });

module.exports = activities;