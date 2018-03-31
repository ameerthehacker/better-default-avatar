const Jimp = require("jimp");
const utils = require("./utils");

const AvatarGenerator = {
  generate(options) {
    // Set the options to empty object if is provided
    options = options || {};
    const size = parseInt(options.size || 40);
    const name = options.name;
    const bgColor = options.bgColor || utils.getRandomColorCode();
    let font = options.font;

    return new Promise((resolve, reject) => {
      // Throw error if no name is given
      if (!name) {
        reject("option name is required");
      }
      const shortName = utils.getShortName(name);
      let bestFontSize = 0;
      // Create a basic canvas of width * height
      new Jimp(size, size, bgColor, (err, avatar) => {
        if (!err) {
          // Decide the font to use if nothing is specified
          if (!font) {
            bestFontSize = utils.getBestFontSize(size);
            // Choose the jimp provided font
            font = utils.getFont(bestFontSize);
          }
          // Print the user's short name in the avatar
          Jimp.loadFont(font, (err, font) => {
            if (!err) {
              avatar.print(
                font,
                Math.floor(size / 2 - utils.getOffset(font, shortName) / 2),
                Math.floor(size / 2 - bestFontSize / 2),
                shortName
              );
              resolve(avatar);
            } else {
              reject(err);
            }
          });
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
  },
  getBase64(avatar, mime) {
    return new Promise((resolve, reject) => {
      avatar.getBase64(utils.getMime(mime), (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  },
  getBuffer(avatar, mime) {
    return new Promise((resolve, reject) => {
      avatar.getBuffer(utils.getMime(mime), (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  }
};

module.exports = AvatarGenerator;
