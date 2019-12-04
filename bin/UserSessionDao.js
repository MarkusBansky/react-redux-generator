"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserSessionDao {
    constructor(data) {
        this._session_id = data.session_id;
        this._user = data.user;
        this._jwt_token = data.jwt_token;
        this._expiration_time = data.expiration_time;
    }
    toJSON() {
        return {
            session_id: this._session_id,
            user: this._user,
            jwt_token: this._jwt_token,
            expiration_time: this._expiration_time,
        };
    }
    get session_id() {
        return this._session_id;
    }
    get user() {
        return this._user;
    }
    get jwt_token() {
        return this._jwt_token;
    }
    get expiration_time() {
        return this._expiration_time;
    }
    set session_id(value) {
        this._session_id = value;
    }
    set user(value) {
        this._user = value;
    }
    set jwt_token(value) {
        this._jwt_token = value;
    }
    set expiration_time(value) {
        this._expiration_time = value;
    }
}
exports.default = UserSessionDao;
//# sourceMappingURL=UserSessionDao.js.map