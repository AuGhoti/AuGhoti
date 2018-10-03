const express = require("express");
const moment = require("moment");
const history = express.Router();
const HistoricalAction = require("../models/HistoricalAction");

history
  .route("/")
  .get((req, res) => {
    HistoricalAction.find({ userId: req.user._id }, (err, actions) => {
        if (err) res.status(500).send(err);
        else {
          const response = {
            page: 1,
            pages: 1,
            actions
          };
          // If a sort is requested, return the timers in accordance with the request
          if (req.query.sort) {
            switch (req.query.sort) {
              case "date":
                const newActions = {};
                for (action of response.actions) {
                  if (newActions[moment(action.endTime).format("L")])
                    newActions[moment(action.endTime).format("L")].push(action);
                  else
                    newActions[moment(action.endTime).format("L")] = [action];
                }
                response.actions = newActions;
                break;
            }
          };
          // Limits returned results to 50 per page, starting at the page sent by user
          if (response.actions.length > 50) {
            response.actions = actions.splice(
              (req.query.page && req.query.page * 50 < actions.length
                ? req.query.page * 50
                : 0) + 1,
              50
            );
            response.page =
              req.query.page && req.query.page * 50 < actions.length
                ? req.query.page
                : 1;
            response.pages = Math.ceil(actions.length / 50);
          }
          res.send(response);
        }
    })
  })
  .post((req, res) => {
    const newAction = new HistoricalAction(req.body);
    newAction.userId = req.user._id;
    newAction.save((err, action) => {
      if (err) return res.status(500).send(err);
      return res.status(201).send(action);
    });
  });

history
  .route("/:id")
  .get((req, res) => {
    HistoricalAction.findOne({ _id: req.params.id, userId: req.user._id }, (err, action) => {
        if (err) return res.status(404).send(err);
        return res.send(action);
    });
  })
  .delete((req, res) => {
    HistoricalAction.findOneAndRemove({ _id: req.params.id, userId: req.user._id }, err => {
      if (err) return res.status(404).send(err);
      return res.sendStatus(204);
    });
  })
  .put((req, res) => {
    HistoricalAction.findOneAndUpdate(
        { _id: req.params.id, userId: req.user._id },
        req.body,
        { new: true, runValidators: true },
        (err, action) => {
            if (err) return res.status(400).send(err);
            return res.send(action);
        }
    );
  });

module.exports = history;