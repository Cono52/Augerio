const express = require("express");
const app = express();
const morgan = require("morgan");
const { sessionMiddleware, checkCookie } = require("./services/sessions");
const userRoutes = require("./user").routes;
const companyRoutes = require("./company").routes;

// Internal Middlewares

app.use(sessionMiddleware());

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://192.168.1.104:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Routes

app.use("/user", userRoutes);
app.use("/company", companyRoutes);

// Generic dev routes

const db = require("./services/db");

app.get("/getallposts", checkCookie, (req, res) => {
  db.getAllPosts()
    .then(posts => res.send(posts))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = app;
