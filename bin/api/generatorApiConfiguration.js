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
const fs = require('fs');
class GeneratorApiConfiguration {
    constructor(pathToDefinition, pathToBuild) {
        this.createApiStructure = async (resolve, reject) => {
            const api = await swagger_parser_1.default.validate(this._pathToDefinition);
            // Set all required models and create the structure of the API inside the code
            this._serverUrl = api.host + api.basePath;
            // Create models for API
            this._models = lodash_1.default.entries(api.definitions).map(def => {
                return new generatorApiModel_1.default(def[0], def[1]);
            });
            resolve();
        };
        this.generateApiOutputs = (resolve, reject) => {
            lodash_1.default.forEach(this._models, (model, index, arr) => {
                switch (model.type) {
                    case 'object':
                        let pathToTemplate = path.resolve(__dirname, '../../src/templates/model.ejs');
                        if (!fs.existsSync(this._pathToOutputFolder)) {
                            fs.mkdirSync(this._pathToOutputFolder, { recursive: true });
                        }
                        let renderedTemplate = ejs.render(fs.readFileSync(pathToTemplate, 'utf8'), model);
                        fs.writeFileSync(path.resolve(this._pathToOutputFolder, model.name + '.ts'), renderedTemplate);
                        break;
                }
            });
            resolve();
        };
        this._pathToDefinition = pathToDefinition;
        this._pathToOutputFolder = path.resolve(pathToBuild, 'models');
        this._serverUrl = '';
        this._models = [];
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
