#!/usr/bin/env node

import * as chalk from 'chalk';
const log = console.log;

// Combine styled and normal strings
log(chalk.blue('Hello') + ' World' + chalk.red('!'));