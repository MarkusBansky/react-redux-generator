"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const modelItem_1 = __importDefault(require("../interfaces/modelItem"));
const modelProperty_1 = __importDefault(require("../interfaces/modelProperty"));
class GeneratorApiModel {
    constructor(name, data) {
        this._name = name;
        this._type = data.type;
        switch (this._type) {
            case 'object':
                this._properties = lodash_1.default.entries(data.properties).map(prop => new modelProperty_1.default(prop[0], prop[1]));
                break;
            case 'array':
                this._items = new modelItem_1.default(data.items);
        }
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
    get items() {
        return this._items;
    }
    get properties() {
        return this._properties;
    }
}
exports.default = GeneratorApiModel;
