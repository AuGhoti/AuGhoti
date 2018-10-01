const express = require("express");
const activities = express.Router();
const Activity = require("../models/Activity");

activities
  .route("/")
  .get((_, res) => {
    Activity.find((err, activity) => {
      if (err) res.status(500).send({ err });
      else res.send(activity);
    });
  })
  .post((req, res) => {
    Activity.create(req.body, (err, activity) => {
      if (err) res.status(500).send({ err });
      else res.status(201).send(activity);
    });
  });

activities
  .route("/:id")
  .get((req, res) => {
    Activity.findById(req.params.id, (err, activity) => {
      if (err) res.status(404).send({ err });
      else res.send(activity);
    });
  })
  .put((req, res) => {
    Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
      (err, activity) => {
        if (err) res.status(404).send({ err });
        else res.send(activity);
      }
    );
  })
  .delete((req, res) => {
    Activity.findByIdAndRemove(req.params.id, (err, activity) => {
      if (err) res.status(404).send({ err });
      else res.status(204).send();
    });
  });

module.exports = activities;