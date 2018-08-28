const ScrapeInfo = require("./scrape");
const { log } = require("signale");

class Popbuild {
  constructor() {
    this.scrapeInfo = new ScrapeInfo();
  }
  async _getChampData(input) {
    return await this.scrapeInfo._getData(input);
  }
}

module.exports = new Popbuild();
