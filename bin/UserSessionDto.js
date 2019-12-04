"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserSessionDto {
    constructor(data) {
        this._user_id = data.user_id;
        this._token = data.token;
        this._expiration_date = data.expiration_date;
    }
    toJSON() {
        return {
            user_id: this._user_id,
            token: this._token,
            expiration_date: this._expiration_date,
        };
    }
    get user_id() {
        return this._user_id;
    }
    get token() {
        return this._token;
    }
    get expiration_date() {
        return this._expiration_date;
    }
    set user_id(value) {
        this._user_id = value;
    }
    set token(value) {
        this._token = value;
    }
    set expiration_date(value) {
        this._expiration_date = value;
    }
}
exports.default = UserSessionDto;
//# sourceMappingURL=UserSessionDto.js.map