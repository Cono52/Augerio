const express = require("express");
const morgan = require("morgan");
const app = express();

const { sessionMiddleware, checkCookie } = require("./services/sessions");

const db = require("./services/db");
const cdnRoutes = require("./services/cdn").routes;

const userRoutes = require("./user").routes;
const companyRoutes = require("./company").routes;

app.use(sessionMiddleware());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.use("/user", userRoutes);
app.use("/company", companyRoutes);
app.use("/cdn", cdnRoutes);

// Generic routes
app.get("/getallposts", checkCookie, (req, res) => {
  db.getAllPosts()
    .then(posts => res.send(posts))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = app;
