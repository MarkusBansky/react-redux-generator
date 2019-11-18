"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModelProperty {
    constructor(name, data) {
        this._name = name;
        switch (data.type) {
            case 'array':
                this._type = data.items.type + '[]';
                break;
            default:
                this._type = data.type;
                break;
        }
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
}
exports.default = ModelProperty;
