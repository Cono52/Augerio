const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");

const db = require("./services/db");

const userRoutes = require("./user").routes;
const companyRoutes = require("./company").routes;

// TODO: move into user routes
const cdnRoutes = require("./services/cdn").routes;

const { verifyToken } = require("./user");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(bodyParser.json());
app.use(morgan("combined"));

app.use("/user", userRoutes);
app.use("/company", companyRoutes);
app.use("/cdn", cdnRoutes);

app.get("/", (req, res) => res.send("Hello World!"));

// Generic routes
app.get("/getallposts", verifyToken, (req, res) => {
  db.getAllPosts()
    .then(posts => res.send(posts))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = app;
