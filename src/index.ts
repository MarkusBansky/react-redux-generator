#!/usr/bin/env node

import * as chalk from 'chalk';
import * as boxen from 'boxen';
const log = console.log;

// Log greeting
const greetingMessage = chalk.red('R') + 'eact ' + chalk.green('R') + 'edux ' + chalk.blue('G') + 'enerator';
log(boxen(greetingMessage, {padding: 1, margin: 1, borderStyle: 'double' as any}));

// Create the generator class instance:
