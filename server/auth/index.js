const routes = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { addUser } = require("../db");

routes.post("/signup", (req, res) => {
  console.log(req.body);
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
    console.log(hash);
  });
  res.json({ message: "nice" });
});

routes.post("/login", (req, res) => {
  const user = {
    email: "test@email.com",
    password: "test"
  };

  jwt.sign(
    { user },
    process.env.JWT_SECRET,
    { expiresIn: "30s" },
    (err, token) => {
      res.json({ token });
    }
  );
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET, err => {
      if (err) {
        res.sendStatus(403);
      } else {
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
}

module.exports = { routes, verifyToken };
