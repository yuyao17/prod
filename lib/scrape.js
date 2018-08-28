const $ = require("cheerio");
const chalk = require("chalk");
const signale = require("signale");
const rp = require("request-promise");

signale.config({ displayLabel: false });

const { log, debug } = signale;

const CAT_TO_TITLE = {
  items: "Popular Items",
  spells: "Popular Spells",
  boots: "Popular Boots"
};

const CAT_TO_CHALK = {
  items: "green",
  spells: "blue",
  boots: "yellow"
};

class ScrapeInfo {
  async _getData(champ) {
    const URL = `https://www.probuilds.net/champions/details/${champ}`;
    try {
      const body = {
        items: {},
        spells: {},
        boots: {}
      };

      const html = await rp(URL);
      const childs = $("div[class=popular-section]", html).children(".bigData");
      for (let i = 0; i < childs.length; i++) {
        let title = childs[i].parent.children[0].next.children[0].data;
        let item = childs[i].children[5].children[0].data;
        let percentage = childs[i].children[7].children[0].data;
        switch (title) {
          case "Popular Items":
            body.items[item] = percentage;
            break;
          case "Popular Summoners Spells":
            body.spells[item] = percentage;
            break;
          case "Popular Boots":
            body.boots[item] = percentage;
            break;
        }
      }

      Object.keys(body).forEach(category => {
        let cat_title = CAT_TO_TITLE[category];
        let chalk_color = CAT_TO_CHALK[category];

        debug({ prefix: "\n", message: chalk[chalk_color](cat_title) });
        Object.keys(body[category]).forEach(item => {
          log({ prefix: "\n ", message: item, suffix: body[category][item] });
        });
      });
    } catch (e) {
      throw new Error(`${champ} is not a valid champion`);
    }
  }
}

module.exports = ScrapeInfo;
