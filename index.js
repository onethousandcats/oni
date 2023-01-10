#! /usr/bin/env node

import chalk from "chalk";
import boxen from "boxen";

import { init } from "./lib/init.js";
import { add } from "./lib/add.js";
import { rags } from "./lib/rags.js";

const usage = "usage: oni <command> [<args>]";

const welcome = boxen(chalk.green("Someone somewhere is wishing for your happiness"),
        { borderColor: 'green', padding: 1, dimBorder: true  });

const config = rags
    .welcome(welcome)
    .usage(usage)
    .addCommand("init", init)
    .addCommand("add", add)
    // .listCommands()
    .help()
    .run();