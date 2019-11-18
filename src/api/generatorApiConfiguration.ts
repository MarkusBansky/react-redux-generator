import * as ejs from 'ejs';
import _ from 'lodash';
import * as path from "path";
import SwaggerParser from "swagger-parser";
import GeneratorApiModel from "./generatorApiModel";
import GeneratorApiPath from "./generatorApiPath";

const fs = require('fs');

export default class GeneratorApiConfiguration {
    private _name: string;

    private readonly _pathToDefinition: string;
    private readonly _pathToOutputFolder: string;

    private _serverUrl: string;
    private _models: GeneratorApiModel[];
    private _paths: GeneratorApiPath[];

    constructor(pathToDefinition: string, pathToBuild: string) {
        this._pathToDefinition = pathToDefinition;
        this._pathToOutputFolder = pathToBuild;
        this._serverUrl = '';
        this._models = [];
        this._paths = [];
    }

    public getName(): string {
        return path.parse(this._pathToDefinition).name;
    }

    private createApiStructure = async (resolve, reject) => {
        try {
            const api: any = await SwaggerParser.validate(this._pathToDefinition);

            // Set all required models and create the structure of the API inside the code
            this._serverUrl = api.host + api.basePath;
            this._name = api.info.title;

            // Create models for API
            this._models = _.entries(api.definitions).map(def => {
                return new GeneratorApiModel(def[0], def[1]);
            });

            // Create paths from API object
            this._paths = _.entries(api.paths).map(def => {
                console.log(def);
                return new GeneratorApiPath(def[0], def[1]);
            });
        } catch (e) {
            reject(e);
        }

        resolve();
    };

    private generateApiOutputs = (resolve, reject) => {
        try {
            let pathToActionsTemplate = path.resolve(__dirname, '../../src/templates/actions.ejs');
            let pathToModelsTemplate = path.resolve(__dirname, '../../src/templates/model.ejs');
            let pathToModels = path.resolve(this._pathToOutputFolder, 'models');
            let pathToActions = path.resolve(this._pathToOutputFolder, 'actions');

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
            let renderedTemplate = ejs.render(
                fs.readFileSync(pathToActionsTemplate, 'utf8'),
                {_paths: this._paths});
            // Save the rendered actions file into the folder
            fs.writeFileSync(path.resolve(pathToActions, this._name + 'Actions.ts'), renderedTemplate);
        } catch (e) {
            reject(e);
        }

        resolve();
    };

    /**
     * Creates this API with all required files.
     */
    public create(): Promise<any> {
        return new Promise(this.createApiStructure);
    }

    /**
     * Generate API files in the output directory.
     */
    public generate(): Promise<any> {
        return new Promise(this.generateApiOutputs);
    }
}