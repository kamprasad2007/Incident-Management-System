"use strict";

const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

const IncidentRoute = require("./src/routes/incident.route");
const UserRoute = require("./src/routes/user.route");
const { Connect } = require("./src/db/config");
const Seed = require("./src/db/seed");

// Constants
const { PORT = 4000, HOST = "0.0.0.0" } = process.env;
const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
};

if (dotenv.error) return process.exit(dotenv.error);
console.log("Successfully loaded config !");

// initialize database
(async() => {
  await Connect();
  await Seed();
})();

// App
app.use(bodyParser.json())
app.use(cors(corsOptions));
app.use("/api/", IncidentRoute);
app.use("/api/", UserRoute);

app.listen(PORT);
console.log(`Running on http://${HOST}:${PORT}`);
