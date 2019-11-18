"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const utils_1 = require("../utils");
class GeneratorApiMethod {
    constructor(name, data) {
        this._name = data.description;
        this._type = utils_1.toFirstUpperLetter(name);
        this._consumes = data.consumes[0];
        this._produces = data.produces[0];
        lodash_1.default.forEach(data.parameters, param => {
            if (param.in === 'body') {
                this._requestBody = {
                    _name: param.name,
                    _schema: param.schema,
                };
                return;
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
}
exports.default = GeneratorApiMethod;
