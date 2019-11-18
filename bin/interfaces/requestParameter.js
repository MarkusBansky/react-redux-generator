"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestParameter {
    constructor(data) {
        this._name = data.name;
        this._type = data.type;
        this._required = data.required;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
}
exports.default = RequestParameter;
