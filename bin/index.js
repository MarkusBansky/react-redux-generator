#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var boxen = require("boxen");
var log = console.log;
var greetingMessage = chalk.red('React') + ' ' + chalk.green('Redux') + ' ' + chalk.blue('Generator');
// Combine styled and normal strings
log(boxen(greetingMessage, { padding: 1, margin: 1, borderStyle: 'double' }));
