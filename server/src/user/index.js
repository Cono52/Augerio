const routes = require("express").Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
const { uploadImage } = require("../services/cdn");

const {
  isUser,
  addUser,
  isEmailAuthorizedByCompany,
  deleteAuthorizedEmail
} = require("../services/db");

const { checkCookie } = require("../services/sessions");

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
  console.log(email, password);
  if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
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
    res.status(401).json({ error: "Email and/or password are incorrect." });
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

// Warning: loading to many images into memoery can crash app
const Storage = multer.memoryStorage();
const upload = multer({ storage: Storage });

routes.post("/upload", [checkCookie, upload.single("photo")], (req, res) => {
  uploadImage(req.file)
    .then(url => {
      // TODO: Store this URL along with the user and info to Postgres
      const imageURL = url;
    })
    .catch(err => {
      res.status(400).json({
        message: "Something went wrong uplading to CDN"
      });
    });
  console.log("body", req.body);
  res.status(200).json({
    message: "success!"
  });
});

module.exports = { routes, verifyToken };
