#! /usr/bin/env node
const chalk = require('chalk')
const yargs = require("yargs")

const usage = chalk.keyword('violet')("\nUsage: Select options for CCI to start")

const options = yargs
    .usage(usage)
    .help(true)
    .argv