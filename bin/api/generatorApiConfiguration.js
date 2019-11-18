"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ejs = __importStar(require("ejs"));
const lodash_1 = __importDefault(require("lodash"));
const path = __importStar(require("path"));
const swagger_parser_1 = __importDefault(require("swagger-parser"));
const generatorApiModel_1 = __importDefault(require("./generatorApiModel"));
const generatorApiPath_1 = __importDefault(require("./generatorApiPath"));
const fs = require('fs');
class GeneratorApiConfiguration {
    constructor(pathToDefinition, pathToBuild) {
        this.createApiStructure = async (resolve, reject) => {
            try {
                const api = await swagger_parser_1.default.validate(this._pathToDefinition);
                // Set all required models and create the structure of the API inside the code
                this._serverUrl = api.host + api.basePath;
                this._name = api.info.title;
                // Create models for API
                this._models = lodash_1.default.entries(api.definitions).map(def => {
                    return new generatorApiModel_1.default(def[0], def[1]);
                });
                // Create paths from API object
                this._paths = lodash_1.default.entries(api.paths).map(def => {
                    console.log(def);
                    return new generatorApiPath_1.default(def[0], def[1]);
                });
            }
            catch (e) {
                reject(e);
            }
            resolve();
        };
        this.generateApiOutputs = (resolve, reject) => {
            try {
                let pathToActionsTemplate = path.resolve(__dirname, '../../src/templates/actions.ejs');
                let pathToModelsTemplate = path.resolve(__dirname, '../../src/templates/model.ejs');
                let pathToModels = path.resolve(this._pathToOutputFolder, 'models');
                let pathToActions = path.resolve(this._pathToOutputFolder, 'actions');
                // Generate MODELS for every schema input in the api
                lodash_1.default.forEach(this._models, (model, index, arr) => {
                    if (model.type === 'object') {
                        if (!fs.existsSync(pathToModels)) {
                            fs.mkdirSync(pathToModels, { recursive: true });
                        }
                        let renderedTemplate = ejs.render(fs.readFileSync(pathToModelsTemplate, 'utf8'), model);
                        fs.writeFileSync(path.resolve(pathToModels, model.name + '.ts'), renderedTemplate);
                    }
                });
                // Generate actions for every path and method in the api file
                // Create the output folder if it does not exist
                if (!fs.existsSync(pathToActions)) {
                    fs.mkdirSync(pathToActions, { recursive: true });
                }
                // Render the output file
                let renderedTemplate = ejs.render(fs.readFileSync(pathToActionsTemplate, 'utf8'), { _paths: this._paths });
                // Save the rendered actions file into the folder
                fs.writeFileSync(path.resolve(pathToActions, this._name + 'Actions.ts'), renderedTemplate);
            }
            catch (e) {
                reject(e);
            }
            resolve();
        };
        this._pathToDefinition = pathToDefinition;
        this._pathToOutputFolder = pathToBuild;
        this._serverUrl = '';
        this._models = [];
        this._paths = [];
    }
    getName() {
        return path.parse(this._pathToDefinition).name;
    }
    /**
     * Creates this API with all required files.
     */
    create() {
        return new Promise(this.createApiStructure);
    }
    /**
     * Generate API files in the output directory.
     */
    generate() {
        return new Promise(this.generateApiOutputs);
    }
}
exports.default = GeneratorApiConfiguration;
