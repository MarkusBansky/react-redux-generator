"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const generatorApiMethod_1 = __importDefault(require("./generatorApiMethod"));
class GeneratorApiPath {
    constructor(name, data) {
        this._path = name;
        this._methods = lodash_1.default.entries(data).map(entry => new generatorApiMethod_1.default(entry[0], entry[1]));
    }
    get path() {
        return this._path;
    }
    set path(value) {
        this._path = value;
    }
    get methods() {
        return this._methods;
    }
    set methods(value) {
        this._methods = value;
    }
}
exports.default = GeneratorApiPath;
