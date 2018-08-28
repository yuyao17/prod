#!/usr/bin/env node
const meow = require("meow");
const popbuild = require(".");
const champ_name = process.argv[2];

const cli = meow(
  `
  HELPME:
    --get, -g: Get popular build of the champion
`,
  {
    flags: {
      get: {
        type: "boolean",
        alias: "g"
      }
    }
  }
);

popbuild(cli.input, cli.flags);
