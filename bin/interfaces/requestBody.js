"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestBody {
    constructor(data) {
        this._name = data.name;
        this._schema = data.schema;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get schema() {
        return this._schema;
    }
    set schema(value) {
        this._schema = value;
    }
}
exports.default = RequestBody;
