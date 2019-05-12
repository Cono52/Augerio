const express = require("express");
const app = express();
const multer = require("multer");
const bodyParser = require("body-parser");
const { getPosts } = require("./db");
const port = 3001;

const fakeData = require("./fakeData");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./images");
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: Storage });

app.post("/api/upload", upload.array("photo", 3), (req, res) => {
  console.log("file", req.files);
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
