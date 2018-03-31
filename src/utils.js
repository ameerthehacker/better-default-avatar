const randomColor = require("randomcolor");

const utils = {
  getRandomColorCode() {
    let colorCode = randomColor();
    // Remove the # in the start and append 0x in the begimning
    colorCode = `0x${colorCode.substr(1)}`;
    return parseInt(colorCode);
  }
};

module.exports = utils;
