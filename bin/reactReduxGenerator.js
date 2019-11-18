"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const chalk_1 = __importDefault(require("chalk"));
const listr_1 = __importDefault(require("listr"));
const jsonfile_1 = __importDefault(require("jsonfile"));
const constants_1 = require("./constants");
const generatorApiConfiguration_1 = __importDefault(require("./api/generatorApiConfiguration"));
const path = __importStar(require("path"));
const ejs = __importStar(require("ejs"));
const fs = require('fs');
class ReactReduxGenerator {
    constructor() {
        this.generateUtilityFiles = (reject) => {
            try {
                let pathToOutputFolder = path.resolve(this._pathToApiBuildFolder, 'utils');
                let pathToUtilsTemplate = path.resolve(__dirname, '../src/templates/utils.ejs');
                let pathToConstantsTemplate = path.resolve(__dirname, '../src/templates/constants.ejs');
                if (!fs.existsSync(pathToOutputFolder)) {
                    fs.mkdirSync(pathToOutputFolder, { recursive: true });
                }
                let renderedUtilsTemplate = ejs.render(fs.readFileSync(pathToUtilsTemplate, 'utf8'));
                fs.writeFileSync(path.resolve(pathToOutputFolder, 'utils.ts'), renderedUtilsTemplate);
                let renderedConstantsTemplate = ejs.render(fs.readFileSync(pathToConstantsTemplate, 'utf8'));
                fs.writeFileSync(path.resolve(pathToOutputFolder, 'constants.ts'), renderedConstantsTemplate);
            }
            catch (e) {
                reject(e);
            }
        };
        // Read the config file and load all config variables
        this._pathToApiDefinitionsFolder = constants_1.WORKING_DIRECTORY + '/api';
        this._pathToApiBuildFolder = constants_1.WORKING_DIRECTORY + '/src/api';
        this._apisDefinitionFiles = [];
        const tasks = new listr_1.default([
            {
                title: 'Read RRG configuration file',
                task: () => new Promise((resolve, reject) => {
                    // Get directory and try to read the file
                    jsonfile_1.default.readFile(constants_1.CONFIG_PATH, (error, data) => {
                        if (error || !data) {
                            throw error ? error : new Error('Could not read the configuration file properly');
                        }
                        // Read definition directory
                        if (data.definitionDir) {
                            this._pathToApiDefinitionsFolder = constants_1.WORKING_DIRECTORY + '/' + data.definitionDir;
                        }
                        // Read build directory
                        if (data.buildDir) {
                            this._pathToApiBuildFolder = constants_1.WORKING_DIRECTORY + '/' + data.buildDir;
                        }
                    });
                    console.log('\t Path to definitions folder: ' + chalk_1.default.cyanBright(this._pathToApiDefinitionsFolder));
                    console.log('\t Path to build folder: ' + chalk_1.default.cyanBright(this._pathToApiBuildFolder));
                    resolve('Successfully loaded configuration file');
                })
            },
            {
                title: 'Load API definition files',
                task: () => new Promise((resolve, reject) => {
                    let efs = fs.readdirSync(this._pathToApiDefinitionsFolder);
                    this._apisDefinitionFiles = lodash_1.default.map(efs, f => this._pathToApiDefinitionsFolder + '/' + f);
                    if (efs.length > 0) {
                        resolve('Loaded ' + efs.length + ' definitions');
                    }
                    else {
                        reject('No definitions found');
                    }
                })
            },
            {
                // Used to create generator controllers, generators can have more complex construction methods
                // so this is separated as a new task to track the progress and catch any errors possible.
                title: 'Create generator controllers',
                task: () => new Promise((resolve, reject) => {
                    this._generators = lodash_1.default.map(this._apisDefinitionFiles, (file) => new generatorApiConfiguration_1.default(file, this._pathToApiBuildFolder));
                    resolve();
                })
            },
            {
                title: 'Create API structure',
                task: () => new listr_1.default(lodash_1.default.map(this._generators, generator => ({
                    title: generator.getName(),
                    task: () => generator.create()
                })))
            },
            {
                title: 'Generate general utility files',
                task: () => new Promise((resolve, reject) => {
                    this.generateUtilityFiles(reject);
                    resolve();
                })
            },
            {
                title: 'Generate API',
                task: () => new listr_1.default(lodash_1.default.map(this._generators, generator => ({
                    title: generator.getName(),
                    task: () => generator.generate()
                })))
            }
        ]);
        tasks.run().catch(err => {
            console.error(chalk_1.default.redBright(err));
        });
    }
}
exports.default = ReactReduxGenerator;
