// Set up required modules
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const expressJwt = require("express-jwt");
const morgan = require("morgan");
const PORT = process.env.PORT || 8080;
require("dotenv").config();

// Adding middleware
app
  .use(morgan("dev"))
  .use(express.json())
  .use("/api", expressJwt({ secret: process.env.SECRET }));

// Designate routes for API
app
  .use("/auth", require("./routes/auth"))
  .use("/api/historical", require("./routes/historicalActionRoute"))
  .use("/api/current", require("./routes/currentActionRoute"))
  .use("/api/activities", require("./routes/activityRoute"));

// Connect to the database
mongoose
  .connect(
    "mongodb://localhost:27017/au",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("connected to au database");
  })
  .catch(err => console.log(err));

// Get server listening on designated port
app.listen(PORT, () => {
  console.log(`Server is now listening on port ${PORT}`);
});
