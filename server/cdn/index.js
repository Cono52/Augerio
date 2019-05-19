const cloudinary = require("cloudinary").v2;

function uploadImage(file) {
  return cloudinary.uploader.upload(file, (error, result) =>
    console.log(result, error)
  );
}

module.exports = {
  uploadImage
};
