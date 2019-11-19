import _ from 'lodash';
import Listr from 'listr';
import {CONFIG_PATH, WORKING_DIRECTORY} from "./constants";
import GeneratorApiConfiguration from "./api/generatorApiConfiguration";

const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

/**
 * Main file used to generate API structure from Swagger definition.
 */
export default class ReactReduxGenerator {
    private _pathToApiDefinitionsFolder: string;
    private _pathToApiBuildFolder: string;

    private _apisDefinitionFiles: string[];
    private _generators: GeneratorApiConfiguration[];

    /**
     * Used to instantiate object of class. Sets default values to global variables, creates list of tasks
     * for API creation and generation.
     */
    constructor() {
        // Read the config file and load all config variables
        this._pathToApiDefinitionsFolder = WORKING_DIRECTORY + '/api';
        this._pathToApiBuildFolder = WORKING_DIRECTORY + '/src/api';
        this._apisDefinitionFiles = [];
        this._generators = [];
    }

    /**
     * Used to start the generation sequence of tasks.
     */
    public start() {
        // Create all tasks for the project API generation
        const tasks = new Listr([
            {title: 'Read RRG configuration file', task: this.readConfig},
            {title: 'Load API definition files', task: this.readInputDirectory},
            {title: 'Create generator controllers', task: this.createGeneratorsFromAPIFiles},
            {title: 'Create API structure', task: this.createAPICodeStructure},
            {title: 'Generate general utility files', task: this.generateUtilityFiles},
            {title: 'Generate API', task: this.generateAPIFiles}
        ]);

        // Run tasks with error catching
        tasks.run().catch(err => {
            console.error(err);
        });
    }

    /**
     * Try to read the configuration file if it exists, then set all global variables to be equal to values extracted
     * from the config file. If it does not exist then system would use default values.
     */
    readConfig = () => new Promise((resolve, reject) => {
        try {
            // Try to read the file in the config path
            const config: {[key: string]: any} = require(CONFIG_PATH);

            // Read definition directory
            if (config.definitionDir) {
                this._pathToApiDefinitionsFolder = WORKING_DIRECTORY + '/' + config.definitionDir;
            }

            // Read build directory
            if (config.buildDir) {
                this._pathToApiBuildFolder = WORKING_DIRECTORY + '/' + config.buildDir;
            }

            // Debug received properties and resolve the promise
            console.log('\t Path to definitions folder: ' + this._pathToApiDefinitionsFolder);
            console.log('\t Path to build folder: ' + this._pathToApiBuildFolder);
            resolve('Successfully loaded configuration file');
        } catch (e) {
            reject(e);
        }
    });

    /**
     * Reads the input directory defined in settings. Then reads the list of files it is containing. If the directory
     * does not contain any files in it, then reject the promise.
     */
    readInputDirectory = () => new Promise((resolve, reject) => {
        try {
            // Read directory and list of files it is containing
            let efs = fs.readdirSync(this._pathToApiDefinitionsFolder);
            this._apisDefinitionFiles = _.map(efs, f => this._pathToApiDefinitionsFolder + '/' + f);

            // Depending on the number of definitions found, resolve or reject the result
            if (efs.length > 0) {
                resolve('Loaded ' + efs.length + ' definitions');
            } else {
                reject('No definitions found');
            }
        } catch (e) {
            reject(e);
        }
    });

    /**
     * For each API file in the input folder, create a new API generator configuration class object with input path
     * to it's relevant file. Later these files would be used to generate different API files.
     */
    createGeneratorsFromAPIFiles = () => new Promise((resolve, reject) => {
        try {
            this._generators = _.map(
                this._apisDefinitionFiles,
                (file: string) => new GeneratorApiConfiguration(file, this._pathToApiBuildFolder));
            resolve();
        } catch (e) {
            reject(e);
        }
    });

    /**
     * For each of the API generators, runs the create sequence to go through all the data in the API definition and
     * create a code structure in memory of this API construction.
     */
    createAPICodeStructure = () => new Promise((resolve, reject) => {
        try {
            _.forEach(this._generators, generator => generator.create());
            resolve();
        } catch (e) {
            reject(e);
        }
    });

    /**
     * Generate all utility files that are going to be used by other files in generated code.
     * These are always stable templates, and contain sample constants and general utility functions.
     * There are two files that are being created: constants.ts and utils.ts. They are being created
     * in the utils directory.
     */
    generateUtilityFiles = () => new Promise((resolve, reject) => {
        try {
            // Define paths to files
            let pathToOutputFolder = path.resolve(this._pathToApiBuildFolder, 'utils');
            let pathToUtilsTemplate = path.resolve(__dirname, '../src/templates/utils.ejs');
            let pathToConstantsTemplate = path.resolve(__dirname, '../src/templates/constants.ejs');
            let pathToUtilsOutput = path.resolve(pathToOutputFolder, 'utils.ts');
            let pathToConstantsOutput = path.resolve(pathToOutputFolder, 'constants.ts');

            // Create the utils directory if it does not exist
            if (!fs.existsSync(pathToOutputFolder)) {
                fs.mkdirSync(pathToOutputFolder, {recursive: true});
            }

            // Generate the utils.ts file
            let renderedUtilsTemplate = ejs.render(fs.readFileSync(pathToUtilsTemplate, 'utf8'));
            fs.writeFileSync(pathToUtilsOutput, renderedUtilsTemplate);

            // Generate the constants.ts file
            let renderedConstantsTemplate = ejs.render(fs.readFileSync(pathToConstantsTemplate, 'utf8'));
            fs.writeFileSync(pathToConstantsOutput, renderedConstantsTemplate);

            resolve();
        } catch (e) {
            reject(e);
        }
    });

    /**
     * Run generate sequence for each of API generators. It creates several files for models, defined in the API,
     * actions, that are used in the code to create requests and reducer, that collects all data and state received
     * from the request and then processes it and passes to the view.
     */
    generateAPIFiles = () => new Promise((resolve, reject) => {
        try {
            _.forEach(this._generators, generator => generator.generate());
            resolve();
        } catch (e) {
            reject(e);
        }
    });
}