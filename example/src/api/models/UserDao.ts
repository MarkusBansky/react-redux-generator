import _ from 'lodash';

export default class UserDao {
    
    private _id: integer;
    
    private _username: string;
    
    private _password_hash: string;
    
    private _first_name: string;
    
    private _middle_name: string;
    
    private _last_name: string;
    
    private _email: string;
    
    private _country_code: string;
    
    private _address_line_1: string;
    
    private _address_line_2: string;
    
    private _post_code: string;
    
    private _mobile_phone: string;
    
    private _created_at: string;
    
    private _updated_at: string;
    
    constructor(data: any) {

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

    toJSON(): any {
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

        }
    }
    
    get id(): integer {
        return this._id;
    }
    
    get username(): string {
        return this._username;
    }
    
    get password_hash(): string {
        return this._password_hash;
    }
    
    get first_name(): string {
        return this._first_name;
    }
    
    get middle_name(): string {
        return this._middle_name;
    }
    
    get last_name(): string {
        return this._last_name;
    }
    
    get email(): string {
        return this._email;
    }
    
    get country_code(): string {
        return this._country_code;
    }
    
    get address_line_1(): string {
        return this._address_line_1;
    }
    
    get address_line_2(): string {
        return this._address_line_2;
    }
    
    get post_code(): string {
        return this._post_code;
    }
    
    get mobile_phone(): string {
        return this._mobile_phone;
    }
    
    get created_at(): string {
        return this._created_at;
    }
    
    get updated_at(): string {
        return this._updated_at;
    }
    
    
    set id(value: integer) {
        this._id = value; 
    }
    
    set username(value: string) {
        this._username = value; 
    }
    
    set password_hash(value: string) {
        this._password_hash = value; 
    }
    
    set first_name(value: string) {
        this._first_name = value; 
    }
    
    set middle_name(value: string) {
        this._middle_name = value; 
    }
    
    set last_name(value: string) {
        this._last_name = value; 
    }
    
    set email(value: string) {
        this._email = value; 
    }
    
    set country_code(value: string) {
        this._country_code = value; 
    }
    
    set address_line_1(value: string) {
        this._address_line_1 = value; 
    }
    
    set address_line_2(value: string) {
        this._address_line_2 = value; 
    }
    
    set post_code(value: string) {
        this._post_code = value; 
    }
    
    set mobile_phone(value: string) {
        this._mobile_phone = value; 
    }
    
    set created_at(value: string) {
        this._created_at = value; 
    }
    
    set updated_at(value: string) {
        this._updated_at = value; 
    }
    
}