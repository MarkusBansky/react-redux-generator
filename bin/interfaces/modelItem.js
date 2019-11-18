"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModelItem {
    constructor(data) {
        this._type = data.type;
    }
    get type() {
        return this._type;
    }
}
exports.default = ModelItem;
