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

    // console.log(await getProfilePhoto(username));

    if ((await getProfilePhoto(username)) != false) {
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

    if (photo != null) {
      return photo.image;
    } else {
      return false;
    }
  } catch (e) {
    return e.message;
  }
}

module.exports = { uploadProfilePhoto, getProfilePhoto };
