#! /usr/bin/env node

import chalk from "chalk";
import boxen from "boxen";

import { init } from "./lib/init.js";
import { add } from "./lib/add.js";
import { rags } from "./lib/rags.js";
import { cat } from "./lib/cat.js";
import { del } from "./lib/delete.js";

const usage = "usage: oni <command> [<args>]";

const welcome = boxen(chalk.green("Someone somewhere is wishing for your happiness"),
        { borderColor: 'green', padding: 1, dimBorder: true  });

const config = rags
    .welcome(welcome)
    .usage(usage)
    .addCommand("init", init)
    .addCommand("del", del)
    .addCommand("add", add)
    .addCommand("cat", cat)
    .listCommands()
    .help()
    .run();