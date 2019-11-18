#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const boxen_1 = __importDefault(require("boxen"));
const constants_1 = require("./constants");
const reactReduxGenerator_1 = __importDefault(require("./reactReduxGenerator"));
const log = console.log;
// Log greeting
const greetingMessage = `${chalk_1.default.red('R')}eact ${chalk_1.default.green('R')}edux ${chalk_1.default.blue('G')}enerator`;
log(boxen_1.default(greetingMessage, { padding: 1, margin: 1, borderStyle: 'double' }));
log('Working directory: ' + chalk_1.default.cyan(constants_1.WORKING_DIRECTORY));
// Create the generator class instance:
new reactReduxGenerator_1.default();
