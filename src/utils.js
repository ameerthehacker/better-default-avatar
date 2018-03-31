const randomColor = require("randomcolor");

const utils = {
  getRandomColorCode() {
    let colorCode = randomColor();
    // Remove the # in the start and append 0x in the begimning
    colorCode = `0x${colorCode.substr(1)}`;

    return parseInt(colorCode);
  },
  getShortName(name) {
    const words = name.split(" ");
    if (words.length == 0) {
      throw new Error("name is empty");
    } else if (words.length == 1) {
      // Return the first character of first name in caps
      return words[0][0].toUpperCase();
    } else {
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }
  },
  // Get the font offset for the given text so that we can center it perfectly
  getOffset(font, text) {
    let x = 0;
    for (let i = 0; i < text.length; i++) {
      if (font.chars[text[i]]) {
        x +=
          font.chars[text[i]].xoffset +
          (font.kernings[text[i]] && font.kernings[text[i]][text[i + 1]]
            ? font.kernings[text[i]][text[i + 1]]
            : 0) +
          (font.chars[text[i]].xadvance || 0);
      }
    }

    return x;
  },
  getBestFontSize(size) {
    const availableSizes = [8, 16, 32, 64, 128];
    // If image size is much bigger return 128
    let bestFontSize = availableSizes[availableSizes.length - 1];

    for (let i = 0; i < availableSizes.length; i++) {
      const thresholdSize = 2 * availableSizes[i];
      if (size <= thresholdSize) {
        bestFontSize = availableSizes[i];
        break;
      }
    }

    return bestFontSize;
  }
};

module.exports = utils;
