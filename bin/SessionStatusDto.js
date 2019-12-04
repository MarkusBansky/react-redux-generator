"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SessionStatusDto {
    constructor(data) {
        this._message = data.message;
        this._valid = data.valid;
    }
    toJSON() {
        return {
            message: this._message,
            valid: this._valid,
        };
    }
    get message() {
        return this._message;
    }
    get valid() {
        return this._valid;
    }
    set message(value) {
        this._message = value;
    }
    set valid(value) {
        this._valid = value;
    }
}
exports.default = SessionStatusDto;
//# sourceMappingURL=SessionStatusDto.js.map