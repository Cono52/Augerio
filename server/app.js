const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");

const { getPosts } = require("./db");
const authRoutes = require("./auth").routes;
const cdnRoutes = require("./cdn").routes;

const { verifyToken } = require("./auth");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
app.use(morgan("combined"));

app.use("/auth", authRoutes);
app.use("/cdn", cdnRoutes);

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/data", verifyToken, (req, res) => {
  getPosts()
    .then(posts => res.send(posts))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = app;
