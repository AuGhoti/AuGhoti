const Activity = require("./models/Activity");
const HistoricalAction = require("./models/HistoricalAction");
const CurrentAction = require("./models/CurrentAction");
const mongoose = require("mongoose");
const moment = require("moment");
mongoose
  .connect(
    "mongodb://localhost:27017/au",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to DB");
    // generateActivities();
    // generateCurrentActions();
    generateHistoricalActions();
  })
  .catch(err => console.error(err));

function generateActivities() {
  console.log("--Generating activities");
  const activities = [
    { title: "movies", userId: "5bb4df214757d2064008a8d9" },
    { title: "class", userId: "5bb4df214757d2064008a8d9" },
    { title: "dinner", userId: "5bb4df214757d2064008a8d9" },
    { title: "work", userId: "5bb4df214757d2064008a8d9" },
    { title: "commute", userId: "5bb4df214757d2064008a8d9" },
    { title: "sleep", userId: "5bb4df214757d2064008a8d9" }
  ];
  activities.forEach((v, i) => {
    console.log(v.title);
    const activity = new Activity(v);
    console.log(activity);
    Activity.create(v, (err, activity) => {
      if (err) console.log(err);
      else console.log(`activity ${i} created`);
    });
  });
  console.log("--Generated activities");
}

function generateHistoricalActions() {
  console.log("--Generating historicalactions");
  const actions = [
    {
      description: "with someone"
    },
    {
      description: "blah"
    },
    {
      description: "boo"
    },
    {
      description: "boogie"
    },
    {
      description: "explosions"
    },
    {
      description: "magic"
    },
    {
      description: "quaint"
    },
    {
      description: "query"
    },
    {
      description: "queezy"
    }
  ];

  Activity.find((err, activity) => {
    if (err) console.log(err);
    else {
      actions.forEach((v, i) => {
        for (let j = 0; j < 5; j++) {
          v.startTime = moment().format("HH:mm:ssZ");
          v.startDate = moment().format("Y-MM-DD");
          v.endTime = moment(v.startTime)
            .add(Math.floor(Math.random() * 10), "m")
            .format("HH:mm:ssZ");
          v.endDate = v.startDate;
          v.activityTitle =
            activity[Math.floor(Math.random() * activity.length)].title;
          v.userId = "5bb4df214757d2064008a8d9";
          HistoricalAction.create(v, (err, action) => {
            if (err) console.log(err);
            else console.log(`historicalaction ${i} created`);
          });
        }
      });
    }
  });
  console.log("--Generated historicalactivities");
}

function generateCurrentActions(count) {
  console.log("--Generating currentactions");
  Activity.find((err, activity) => {
    if (err) console.log(err);
    else {
      const actions = [
        {
          description: "with someone"
        },
        {
          description: "blah"
        },
        {
          description: "boo"
        },
        {
          description: "boogie"
        },
        {
          description: "explosions"
        },
        {
          description: "magic"
        },
        {
          description: "quaint"
        },
        {
          description: "query"
        },
        {
          description: "queezy"
        }
      ];
      actions.forEach((v, i) => {
        console.log(v);
        v.startTime = moment()
          .subtract(Math.floor(Math.random() * 20), "m")
          .format("HH:mm:ssZ");
        v.startDate = moment().format("Y-MM-DD");
        v.activityTitle =
          activity[Math.floor(Math.random() * activity.length)].title;
        v.userId = "5bb4df214757d2064008a8d9";
        CurrentAction.create(
          v,
          (err, action) =>
            err ? console.log(err) : console.log(`currentaction ${i} created`)
        );
      });
    }
  });
  console.log("--Generated currentactions");
}
