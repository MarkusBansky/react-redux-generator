#!/usr/bin/env node

import chalk from 'chalk';
import boxen from 'boxen';
import {WORKING_DIRECTORY} from "./constants";
import ReactReduxGenerator from "./reactReduxGenerator";
const log = console.log;

// Log greeting
const greetingMessage =
    `${chalk.red('R')}eact ${chalk.green('R')}edux ${chalk.blue('G')}enerator`;
log(boxen(greetingMessage, {padding: 1, margin: 1, borderStyle: 'double' as any}));
log('Working directory: ' + chalk.cyan(WORKING_DIRECTORY));

// Create the generator class instance:
new ReactReduxGenerator();