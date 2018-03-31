const Jimp = require("jimp");
const utils = require("./utils");

const Avatar = {
  generate(options) {
    // Set the options to empty object if is provided
    options = options || {};
    const size = options.size || 40;
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
            switch (bestFontSize) {
              case 8:
                font = Jimp.FONT_SANS_8_WHITE;
                break;
              case 16:
                font = Jimp.FONT_SANS_16_WHITE;
                break;
              case 32:
                font = Jimp.FONT_SANS_32_WHITE;
                break;
              case 64:
                font = Jimp.FONT_SANS_64_WHITE;
                break;
              case 128:
                font = Jimp.FONT_SANS_128_WHITE;
                break;
            }
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
  }
};

module.exports = Avatar;
