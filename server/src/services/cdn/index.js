const routes = require("express").Router();
const cloudinary = require("cloudinary").v2;
const Datauri = require("datauri");
const path = require("path");
const multer = require("multer");

function uploadImage(file) {
  return cloudinary.uploader.upload(file, (error, result) =>
    console.log(result, error)
  );
}

// Warning: loading to many images into memoery can crash app
const Storage = multer.memoryStorage();

const upload = multer({ storage: Storage });
const dUri = new Datauri();

const dataUri = file =>
  dUri.format(path.extname(file.originalname).toString(), file.buffer);

routes.post("/upload", upload.single("photo"), (req, res) => {
  const file = dataUri(req.file).content;
  uploadImage(file)
    .then(result => {
      // TODO: Store this URL along with the user and info to Postgres
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

module.exports = {
  routes
};
