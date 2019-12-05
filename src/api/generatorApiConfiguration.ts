import _ from 'lodash';
import chalk from 'chalk';
import SwaggerParser from "swagger-parser";
import GeneratorApiModel from "./generatorApiModel";
import GeneratorApiPath from "./generatorApiPath";
import {checkIfObjectIsEmpty, sentenceToCamelCase} from "../utils";
import GeneratorApiMethod from "./generatorApiMethod";

// Used for file template generation
const ejs = require('ejs');

const path = require('path');
const fs = require('fs');

/**
 * Holds all API configuration that is read from a single definition file.
 * This file reads the definition and create API structure in code, that would be later 
 * generated into .ts files in your project.
 */
export default class GeneratorApiConfiguration {
    /**
     * Name of API from swagger definition.
     */
    private _name: string;

    /**
     * Name of reducer, that is the combination of the original name and a word 'Reducer'.
     */
    private _reducerName: string;

    /**
     * Path to swagger definition file.
     */
    private readonly _pathToDefinition: string;

    /**
     * Path to the folder that would contain all output files generated by this API definition.
     */
    private readonly _pathToOutputFolder: string;

    /**
     * The URL to the server that AXIOS should send requests to. This is used to define the axios client, create
     * one if it does not exist and use the name of the client in the actions functions to call action in
     * correct axios client.
     */
    private _serverUrl: string;

    /**
     * API request/result models used for transferring data via REST API.
     */
    private _models: GeneratorApiModel[];

    /**
     * Paths that are defined in the swagger file. Basically these are the endpoints on the remote server that
     * are accessed by action functions.
     */
    private _paths: GeneratorApiPath[];

    constructor(pathToDefinition: string, pathToBuild: string) {
        // Set default values
        this._pathToDefinition = pathToDefinition;
        this._pathToOutputFolder = pathToBuild;
        this._serverUrl = '';
        this._models = [];
        this._paths = [];
    }

    private _getUniqueMethodVariables(): { name: string, type: string }[] {
        return _.uniqBy(_.flatMapDeep(this._paths, path => _.map(path.methods, (method: GeneratorApiMethod) => {
            if (method.resultVariableName) {
                return { name: method.resultVariableName, type: method.resultVariableType };
            }
        })), 'name');
    }

    /**
     * Used to retrieve the name of the definition file. Is used to create a reducer and add a new axios client
     * whether it is required.
     */
    public getFileName(): string {
        return path.parse(this._pathToDefinition).name;
    }

    /**
     * Used by external Promise to create API structure. If something goes wrong it
     * calls reject function with error.
     * @param resolve Function called when method finishes successfully.
     * @param reject Function called when error occurs.
     */
    public createApiStructure = async (resolve, reject) => {
        try {
            const api: any = await SwaggerParser.parse(this._pathToDefinition);

            // Set all required models and create the structure of the API inside the code
            this._serverUrl = api.servers[0].url;
            this._name = sentenceToCamelCase(api.info.title);
            this._reducerName = this._name + 'Reducer';

            // Create models for API
            this._models = _.entries(api.components.schemas).map(def => {
                console.log(chalk.bgCyan(def[0]));
                console.log(def[1]);
                return new GeneratorApiModel(def[0], def[1]);
            });

            // Create paths from API object
            this._paths = _.entries(api.paths).map(def => {
                console.log(chalk.bgMagenta(def[0]));
                console.log(def[1]);
                return new GeneratorApiPath(def[0], def[1]);
            });

            checkIfObjectIsEmpty('Models', this._models);
            checkIfObjectIsEmpty('Endpoints', this._paths);

            console.log(chalk.bgGreen('this'));
            console.log(this);
        } catch (e) {
            reject(e);
        }

        resolve();
    };

    /**
     * Used by Promise to generate API files for this API configuration. If something goes wrong it
     * calls reject function with error.
     * @param resolve Function called when method finishes successfully.
     * @param reject Function called when error occurs.
     */
    public generateApiOutputs = (resolve, reject) => {
        try {
            let pathToActionsTemplate = path.resolve(__dirname, '../src/templates/actions.ejs');
            let pathToModelsTemplate = path.resolve(__dirname, '../src/templates/model.ejs');
            let pathToReducerTemplate = path.resolve(__dirname, '../src/templates/reducer.ejs');
            let pathToModels = path.resolve(this._pathToOutputFolder, 'models');
            let pathToActions = path.resolve(this._pathToOutputFolder, 'actions');
            let pathToReducers = path.resolve(this._pathToOutputFolder, 'reducers');

            checkIfObjectIsEmpty('Models', this._models);
            checkIfObjectIsEmpty('Endpoints', this._paths);

            // Generate MODELS for every schema input in the api
            _.forEach(this._models, (model, index, arr) => {
                if (model.type === 'object') {
                    if (!fs.existsSync(pathToModels)) {
                        fs.mkdirSync(pathToModels, {recursive: true});
                    }
                    let renderedTemplate = ejs.render(fs.readFileSync(pathToModelsTemplate, 'utf8'), model);
                    fs.writeFileSync(path.resolve(pathToModels, model.name + '.ts'), renderedTemplate);
                }
            });

            // Generate actions for every path and method in the api file
            // Create the output folder if it does not exist
            if (!fs.existsSync(pathToActions)) {
                fs.mkdirSync(pathToActions, {recursive: true});
            }

            // Render the output file
            let actionsRenderedTemplate = ejs.render(
                fs.readFileSync(pathToActionsTemplate, 'utf8'), this);
            // Save the rendered actions file into the folder
            fs.writeFileSync(path.resolve(pathToActions, this._name + 'Actions.ts'), actionsRenderedTemplate);

            // Generate reducer for this configuration file
            // First if the reducers folder does not exist, create one.
            if (!fs.existsSync(pathToReducers)) {
                fs.mkdirSync(pathToReducers, {recursive: true});
            }

            // Render the reducer file
            let reducerRenderedTemplate = ejs.render(
                fs.readFileSync(pathToReducerTemplate, 'utf8'), this);
            // Save the rendered reducer file into the folder
            fs.writeFileSync(path.resolve(pathToReducers, this._name + 'Reducer.ts'), reducerRenderedTemplate);
        } catch (e) {
            reject(e);
        }

        resolve();
    };
}
