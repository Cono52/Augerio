require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const multer = require("multer");
const bodyParser = require("body-parser");
const Datauri = require("datauri");
const path = require("path");

const { getPosts } = require("./db");
const { uploadImage } = require("./cdn");

const port = 3001;

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

app.get("/", (req, res) => res.send("Hello World!"));

// Warning: loading to many images into memoery can crash app
const Storage = multer.memoryStorage();

const upload = multer({ storage: Storage });
const dUri = new Datauri();

const dataUri = req =>
  dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

app.post("/api/upload", upload.single("photo"), (req, res) => {
  const file = dataUri(req).content;
  uploadImage(file)
    .then(result => {
      // Store this URL along with the user and info to Postgres
      const imageURL = result.secure_url;
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

app.get("/data", (req, res) => {
  getPosts()
    .then(posts => res.send(posts))
    .catch(err => {
      console.log(err);
      res.status(500);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
