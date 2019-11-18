import _ from 'lodash';
import chalk from 'chalk';
import Listr from 'listr';
import jsonFile from 'jsonfile';
import {CONFIG_PATH, WORKING_DIRECTORY} from "./constants";
import GeneratorApiConfiguration from "./api/generatorApiConfiguration";
import * as path from "path";
import * as ejs from "ejs";

const fs = require('fs');

export default class ReactReduxGenerator {
    private _pathToApiDefinitionsFolder: string;
    private _pathToApiBuildFolder: string;

    private _apisDefinitionFiles: string[];
    private _generators?: GeneratorApiConfiguration[];

    constructor() {
        // Read the config file and load all config variables
        this._pathToApiDefinitionsFolder = WORKING_DIRECTORY + '/api';
        this._pathToApiBuildFolder = WORKING_DIRECTORY + '/src/api';
        this._apisDefinitionFiles = [];

        const tasks = new Listr([
            {
                title: 'Read RRG configuration file',
                task: () => new Promise((resolve, reject) => {
                    // Get directory and try to read the file
                    jsonFile.readFile(CONFIG_PATH, (error: NodeJS.ErrnoException | null, data: any) => {
                        if (error || !data) {
                            throw error ? error : new Error('Could not read the configuration file properly');
                        }

                        // Read definition directory
                        if (data.definitionDir) {
                            this._pathToApiDefinitionsFolder = WORKING_DIRECTORY + '/' + data.definitionDir;
                        }
                        // Read build directory
                        if (data.buildDir) {
                            this._pathToApiBuildFolder = WORKING_DIRECTORY + '/' + data.buildDir;
                        }
                    });

                    console.log('\t Path to definitions folder: ' + chalk.cyanBright(this._pathToApiDefinitionsFolder));
                    console.log('\t Path to build folder: ' + chalk.cyanBright(this._pathToApiBuildFolder));

                    resolve('Successfully loaded configuration file');
                })
            },
            {
                title: 'Load API definition files',
                task: () => new Promise((resolve, reject) => {
                    let efs = fs.readdirSync(this._pathToApiDefinitionsFolder);
                    this._apisDefinitionFiles = _.map(efs, f => this._pathToApiDefinitionsFolder + '/' + f);
                    if (efs.length > 0) {
                        resolve('Loaded ' + efs.length + ' definitions');
                    } else {
                        reject('No definitions found');
                    }
                })
            },
            {
                // Used to create generator controllers, generators can have more complex construction methods
                // so this is separated as a new task to track the progress and catch any errors possible.
                title: 'Create generator controllers',
                task: () => new Promise((resolve, reject) => {
                    this._generators = _.map(this._apisDefinitionFiles, (file: string) =>
                        new GeneratorApiConfiguration(file, this._pathToApiBuildFolder));
                    resolve();
                })
            },
            {
                title: 'Create API structure',
                task: () => new Listr(_.map(this._generators, generator => ({
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
                task: () => new Listr(_.map(this._generators, generator => ({
                    title: generator.getName(),
                    task: () => generator.generate()
                })))
            }
        ]);

        tasks.run().catch(err => {
            console.error(chalk.redBright(err));
        });
    }

    generateUtilityFiles = (reject) => {
        try {
            let pathToOutputFolder = path.resolve(this._pathToApiBuildFolder, 'utils');
            let pathToTemplate = path.resolve(__dirname, '../src/templates/utils.ejs');

            if (!fs.existsSync(pathToOutputFolder)) {
                fs.mkdirSync(pathToOutputFolder, {recursive: true});
            }

            let renderedTemplate = ejs.render(fs.readFileSync(pathToTemplate, 'utf8'));
            fs.writeFileSync(path.resolve(pathToOutputFolder, 'utils.ts'), renderedTemplate);
        } catch (e) {
            reject(e);
        }
    };
}