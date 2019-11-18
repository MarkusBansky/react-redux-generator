import * as ejs from 'ejs';
import _ from 'lodash';
import * as path from "path";
import SwaggerParser from "swagger-parser";
import GeneratorApiModel from "./generatorApiModel";

const fs = require('fs');

export default class GeneratorApiConfiguration {
    private readonly _pathToDefinition: string;
    private readonly _pathToOutputFolder: string;

    private _serverUrl: string;
    private _models: GeneratorApiModel[];

    constructor(pathToDefinition: string, pathToBuild: string) {
        this._pathToDefinition = pathToDefinition;
        this._pathToOutputFolder = path.resolve(pathToBuild, 'models');
        this._serverUrl = '';
        this._models = [];
    }

    public getName(): string {
        return path.parse(this._pathToDefinition).name;
    }

    private createApiStructure = async (resolve, reject) => {
        const api: any = await SwaggerParser.validate(this._pathToDefinition);

        // Set all required models and create the structure of the API inside the code
        this._serverUrl = api.host + api.basePath;

        // Create models for API
        this._models = _.entries(api.definitions).map(def => {
            return new GeneratorApiModel(def[0], def[1]);
        });

        resolve();
    };

    private generateApiOutputs = (resolve, reject) => {
        _.forEach(this._models, (model, index, arr) => {
            switch (model.type) {
                case 'object':
                    let pathToTemplate = path.resolve(__dirname, '../../src/templates/model.ejs');

                    if(!fs.existsSync(this._pathToOutputFolder)) {
                        fs.mkdirSync(this._pathToOutputFolder, {recursive: true});
                    }

                    let renderedTemplate = ejs.render(fs.readFileSync(pathToTemplate, 'utf8'), model);
                    fs.writeFileSync(path.resolve(this._pathToOutputFolder, model.name + '.ts'), renderedTemplate);
                    break;
            }
        });

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