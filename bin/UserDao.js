"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDao {
    constructor(data) {
        this._id = data.id;
        this._username = data.username;
        this._password_hash = data.password_hash;
        this._first_name = data.first_name;
        this._middle_name = data.middle_name;
        this._last_name = data.last_name;
        this._email = data.email;
        this._country_code = data.country_code;
        this._address_line_1 = data.address_line_1;
        this._address_line_2 = data.address_line_2;
        this._post_code = data.post_code;
        this._mobile_phone = data.mobile_phone;
        this._created_at = data.created_at;
        this._updated_at = data.updated_at;
    }
    toJSON() {
        return {
            id: this._id,
            username: this._username,
            password_hash: this._password_hash,
            first_name: this._first_name,
            middle_name: this._middle_name,
            last_name: this._last_name,
            email: this._email,
            country_code: this._country_code,
            address_line_1: this._address_line_1,
            address_line_2: this._address_line_2,
            post_code: this._post_code,
            mobile_phone: this._mobile_phone,
            created_at: this._created_at,
            updated_at: this._updated_at,
        };
    }
    get id() {
        return this._id;
    }
    get username() {
        return this._username;
    }
    get password_hash() {
        return this._password_hash;
    }
    get first_name() {
        return this._first_name;
    }
    get middle_name() {
        return this._middle_name;
    }
    get last_name() {
        return this._last_name;
    }
    get email() {
        return this._email;
    }
    get country_code() {
        return this._country_code;
    }
    get address_line_1() {
        return this._address_line_1;
    }
    get address_line_2() {
        return this._address_line_2;
    }
    get post_code() {
        return this._post_code;
    }
    get mobile_phone() {
        return this._mobile_phone;
    }
    get created_at() {
        return this._created_at;
    }
    get updated_at() {
        return this._updated_at;
    }
    set id(value) {
        this._id = value;
    }
    set username(value) {
        this._username = value;
    }
    set password_hash(value) {
        this._password_hash = value;
    }
    set first_name(value) {
        this._first_name = value;
    }
    set middle_name(value) {
        this._middle_name = value;
    }
    set last_name(value) {
        this._last_name = value;
    }
    set email(value) {
        this._email = value;
    }
    set country_code(value) {
        this._country_code = value;
    }
    set address_line_1(value) {
        this._address_line_1 = value;
    }
    set address_line_2(value) {
        this._address_line_2 = value;
    }
    set post_code(value) {
        this._post_code = value;
    }
    set mobile_phone(value) {
        this._mobile_phone = value;
    }
    set created_at(value) {
        this._created_at = value;
    }
    set updated_at(value) {
        this._updated_at = value;
    }
}
exports.default = UserDao;
//# sourceMappingURL=UserDao.js.map