// Setup requires
const express = require("express");
const activitiesRouter = express.Router();
const Activity = require("../models/Activity");

// Interact with a users list of custom activities
activitiesRouter
  .route("/")
  .get((req, res) => {
    Activity.find({ userId: req.user._id }, (err, activities) => {
      if (err) res.status(500).send(err);
      return res.send(activities);
    });
  })
  .post((req, res) => {
    const newActivity = new Activity(req.body);
    newActivity.userId = req.user._id;
    newActivity.save((err, activity) => {
      if (err) return res.status(500).send(err);
      return res.status(201).send(activity);
    });
  });

// Modify a specific activity in a user's list
activitiesRouter
  .route("/:id")
  .get((req, res) => {
    Activity.findOne(
      { _id: req.params.id, userId: req.user._id },
      (err, activity) => {
        if (err) return res.status(404).send(err);
        return res.send(activity);
      }
    );
  })
  .delete((req, res) => {
    Activity.findOneAndRemove(
      { _id: req.params.id, userId: req.user._id },
      err => {
        if (err) return res.status(404).send(err);
        return res.sendStatus(204);
      }
    );
  })
  .put((req, res) => {
    Activity.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true },
      (err, action) => {
        if (err) return res.status(404).send(err);
        return res.send(action);
      }
    );
  });

module.exports = activitiesRouter;
