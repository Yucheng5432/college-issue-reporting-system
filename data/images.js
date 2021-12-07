const mongoCollections = require("../config/mongoCollections");
const imagesCollection = mongoCollections.images;

async function uploadProfilePhoto(username, image) {
  if (!image) {
    throw "Please upload image";
  }

  if (!username) {
    throw "Please provide username";
  }

  try {
    const user = await imagesCollection();

    if (getProfilePhoto(username)) {
      let updateImage = {
        image: image,
      };

      let updateProfilePhoto = await user.updateOne(
        { username: username },
        { $set: updateImage }
      );

      if (updateProfilePhoto.modifiedCount == 0) {
        throw "Cannot update";
      } else {
        return "uploaded";
      }
    }

    let newImage = {
      username: username,
      image: image,
    };

    let newProfilePhoto = await user.insertOne(newImage);
    console.log(newProfilePhoto);

    if (newProfilePhoto.insertedCount == 0) {
      throw `Cannot upload image`;
    } else {
      return "uploaded";
    }
  } catch (e) {
    return e.message;
  }
}

async function getProfilePhoto(username) {
  if (!username) {
    throw "Please provide username";
  }

  try {
    const photoCollection = await imagesCollection();
    const photo = await photoCollection.findOne({ username: username });

    if (!photo) {
      return "/public/images/no_image";
    }
    return photo.image;
  } catch (e) {
    return e.message;
  }
}

module.exports = { uploadProfilePhoto, getProfilePhoto };
