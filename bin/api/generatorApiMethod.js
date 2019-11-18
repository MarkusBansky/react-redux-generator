"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const utils_1 = require("../utils");
const requestBody_1 = __importDefault(require("../interfaces/requestBody"));
const requestParameter_1 = __importDefault(require("../interfaces/requestParameter"));
class GeneratorApiMethod {
    constructor(name, data) {
        this._name = data.description;
        this._type = utils_1.toFirstUpperLetter(name);
        this._consumes = data.consumes && data.consumes[0];
        this._produces = data.produces && data.produces[0];
        this._pathParameters = [];
        lodash_1.default.forEach(data.parameters, param => {
            if (param.in === 'body') {
                this._requestBody = new requestBody_1.default(param);
            }
            else if (param.in === 'path') {
                this._pathParameters.push(new requestParameter_1.default(param));
            }
        });
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get consumes() {
        return this._consumes;
    }
    set consumes(value) {
        this._consumes = value;
    }
    get produces() {
        return this._produces;
    }
    set produces(value) {
        this._produces = value;
    }
    get requestBody() {
        return this._requestBody;
    }
    set requestBody(value) {
        this._requestBody = value;
    }
    get pathParameters() {
        return this._pathParameters;
    }
    set pathParameters(value) {
        this._pathParameters = value;
    }
}
exports.default = GeneratorApiMethod;
