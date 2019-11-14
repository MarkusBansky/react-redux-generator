import _ from 'lodash';
import Listr from 'listr';
import {CONFIG_PATH, WORKING_DIRECTORY} from "./constants";
import GeneratorApiConfiguration from "./api/generatorApiConfiguration";
import {removeDirectory} from "./utils";
import Program from "./interfaces/program";
import chalk from "chalk";

const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

/**
 * Main file used to generate API structure from Swagger definition.
 */
export default class ReactReduxGenerator {
    private readonly _usingCommandLineArguments: boolean;
    private _pathToApiBuildFolder: string;
    private _apisDefinitionFiles: string[];

    private _generators: GeneratorApiConfiguration[];

    /**
     * Used to instantiate object of class. Sets default values to global variables, creates list of tasks
     * for API creation and generation.
     */
    constructor(program: Program) {
        this._usingCommandLineArguments = false;

        // Read the config file and load all config variables
        this._pathToApiBuildFolder = WORKING_DIRECTORY + '/src/api';
        this._apisDefinitionFiles = [];
        this._generators = [];

        // Parse arguments of the program if they are entered for the application
        if (program.input || program.output) {
            // Check if any of these is not set
            // if it is not then exit with code 1
            if (!program.input || !program.output) {
                chalk.red('Error. You have to include both inputs and the output if you want to generate api using command parameters');
                process.exit(1);
            }

            // If everything is fine and we have both inputs and output set
            // set the react redux generator values
            console.log(program.input, program.output);
            console.log(chalk.cyan('Notice!') + chalk.red(' Using command line variables, skipping config and directory tasks...'));

            // Depending if the input param for inputs is array or single
            if (Array.isArray(program.input)) {
                this._apisDefinitionFiles = program.input.map(i => path.join(WORKING_DIRECTORY, i));
            } else {
                this._apisDefinitionFiles = [path.join(WORKING_DIRECTORY, program.input)];
            }

            this._usingCommandLineArguments = true;
            this._pathToApiBuildFolder = path.join(WORKING_DIRECTORY, program.output);
        }
    }

    /**
     * Used to start the generation sequence of tasks.
     */
    public start() {
        // Create all tasks for the project API generation
        const tasks = new Listr([
            {title: 'Read RRG configuration file', task: this.readConfig, skip: () => this._usingCommandLineArguments},
            {title: 'Clear output directory', task: this.clearOutputDirectory},
            {title: 'Create generator controllers', task: this.createGeneratorsFromAPIFiles},
            {title: 'Create API structure', task: this.createAPICodeStructure},
            {title: 'Generate general utility files', task: this.generateUtilityFiles},
            {title: 'Generate API', task: this.generateAPIFiles},
            {title: 'Generate middleware file', task: this.generateMiddleware}
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
            const rawFileData = fs.readFileSync(CONFIG_PATH);
            const config: Program = JSON.parse(rawFileData);

            // Read definition directory
            if (config.input && Array.isArray(config.input)) {
                this._apisDefinitionFiles = config.input.map(i => path.join(WORKING_DIRECTORY, i));
            } else if (config.input && typeof config.input === 'string') {
                this._apisDefinitionFiles.push(path.join(WORKING_DIRECTORY, config.input));
            } else {
                process.emitWarning('Could not read value for input files in the config file.');
            }

            // Read build directory
            if (config.output) {
                this._pathToApiBuildFolder = path.join(WORKING_DIRECTORY, config.output);
            }

            // Debug received properties and resolve the promise
            console.log('\t Path to definitions folder: ', this._apisDefinitionFiles);
            console.log('\t Path to build folder: ', this._pathToApiBuildFolder);
            resolve('Successfully loaded configuration file');
        } catch (e) {
            reject('Configuration file not found, you are required to add a configuration file or use command line arguments');
        }
    });

    /*
     * Used to delete everything in the output directory to regenerate the files for the API.
     */
    clearOutputDirectory = () => new Promise((resolve, reject) => {
        try {
            removeDirectory(this._pathToApiBuildFolder);
            resolve("Done");
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
    createAPICodeStructure = () =>
        new Listr(
            _.map(this._generators, generator => ({
                title: generator.getFileName(),
                task: () => new Promise((resolve, reject) => generator.createApiStructure(resolve, reject))
            }))
        );

    /**
     * Generate all utility files that are going to be used by other files in generated code.
     * These are always stable templates, and contain sample constants and general utility functions.
     * There are two files that are being created: constants.ts and utils.ts. They are being created
     * in the utils directory.
     */
    generateUtilityFiles = () => new Promise((resolve, reject) => {
        try {
            // Define paths to files
            let pathToOutputFolder = path.join(this._pathToApiBuildFolder, 'utils');
            let pathToUtilsTemplate = path.join(__dirname, '../src/templates/utils.ejs');
            let pathToConstantsTemplate = path.join(__dirname, '../src/templates/constants.ejs');
            let pathToUtilsOutput = path.join(pathToOutputFolder, 'utils.ts');
            let pathToConstantsOutput = path.join(pathToOutputFolder, 'constants.ts');

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
            this._generators = _.map(this._generators, generator => {
                generator.generateApiOutputs(resolve, reject);
                return generator;
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });

    /**
     * Run to generate final middleware file specification for this api definition. This creates a single file
     * with constants for each api definition. It includes all reducers, creates all axios clients and
     * exports variables to be included in the state creation later in the user code.
     */
    generateMiddleware = () => new Promise((resolve, reject) => {
        try {
            let pathToMiddlewareTemplate = path.resolve(__dirname, '../src/templates/axiosMiddleware.ejs');
            let pathToMiddleware = path.resolve(this._pathToApiBuildFolder);

            // Render the middleware file
            let middlewareRenderedTemplate = ejs.render(
                fs.readFileSync(pathToMiddlewareTemplate, 'utf8'), this);
            // Save the rendered reducer file into the folder
            fs.writeFileSync(path.resolve(pathToMiddleware, 'axiosApiMiddleware.ts'), middlewareRenderedTemplate);

            resolve();
        } catch (e) {
            reject(e);
        }
    });
}