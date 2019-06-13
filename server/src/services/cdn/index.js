const cloudinary = require("cloudinary").v2;
const Datauri = require("datauri");
const path = require("path");

const datauri = new Datauri();

/**
 * Converts a multer file object into a datauri i.e data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D
 * and uploads it using the Cloudinary SDK.
 * https://cloudinary.com/documentation/image_upload_api_reference
 * @param {Express.Multer.File} file A multer file object
 * @return {Promise<{secure_url: String}>} the url to access the uploaded image
 */
function uploadImage(file) {
  const dataUriResult = datauri.format(
    path.extname(file.originalname).toString(),
    file.buffer
  );

  const dataUri = dataUriResult.content;
  return cloudinary.uploader
    .upload(dataUri, (error, result) => console.log(result, error))
    .then(({ secure_url }) => secure_url);
}

module.exports = {
  uploadImage
};
