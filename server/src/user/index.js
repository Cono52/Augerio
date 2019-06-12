const routes = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
  isUser,
  addUser,
  isEmailAuthorizedByCompany,
  deleteAuthorizedEmail
} = require("../services/db");

routes.post("/signup", async (req, res) => {
  const { email, password, companyName } = req.body;

  const { companyId } = await isEmailAuthorizedByCompany(email, companyName);

  if (companyId) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userAdded = await addUser(email, hashedPassword, companyId);
    if (userAdded) {
      deleteAuthorizedEmail(email);
    }
    res.json({ message: "Registration success" });
  } else {
    res.statusMessage = "This email has not been authorized";
    res.status(401).end();
  }
});

routes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await isUser(email);

  if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
    console.log(req.session);
    req.session.key = email;
    res.json({ message: "login success" });
    // jwt.sign(
    //   { email: existingUser.email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "30m" },
    //   (err, token) => {
    //     res.json({ token });
    //   }
    // );
  } else {
    res.statusMessage = "Current email or password don't match";
    res.status(401).end();
  }
});

routes.get("/logout", (req, res) => {
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(200);
    }
  });
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
