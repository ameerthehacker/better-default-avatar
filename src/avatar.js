const Jimp = require("jimp");

const Avatar = {
  generate(options) {
    // Set the options to empty object if is provided
    options = options || {};
    const height = options.height || 40;
    const width = options.width || 40;

    return new Promise((resolve, reject) => {
      // Create a basic canvas of width * height
      new Jimp(width, height, (err, avatar) => {
        if (!err) {
          resolve(avatar);
        } else {
          reject(err);
        }
      });
    });
  },
  writeAvatar(avatar, path) {
    return new Promise((resolve, reject) => {
      avatar.write(path, err => {
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  }
};

module.exports = Avatar;
