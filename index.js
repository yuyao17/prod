const Popbuild = require("./lib/popbuild");

module.exports = popbuildCLI = (input, flag) => {
  if (flag.get) {
    return Popbuild._getChampData(input);
  }
};
