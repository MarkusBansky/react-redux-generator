import _ from 'lodash';

export default class UserSessionDao {
    
    private _session_id: integer;
    
    private _user: object;
    
    private _jwt_token: string;
    
    private _expiration_time: string;
    
    constructor(data: any) {

        this._session_id = data.session_id;

        this._user = data.user;

        this._jwt_token = data.jwt_token;

        this._expiration_time = data.expiration_time;

    }

    toJSON(): any {
        return {

            session_id: this._session_id,

            user: this._user,

            jwt_token: this._jwt_token,

            expiration_time: this._expiration_time,

        }
    }
    
    get session_id(): integer {
        return this._session_id;
    }
    
    get user(): object {
        return this._user;
    }
    
    get jwt_token(): string {
        return this._jwt_token;
    }
    
    get expiration_time(): string {
        return this._expiration_time;
    }
    
    
    set session_id(value: integer) {
        this._session_id = value; 
    }
    
    set user(value: object) {
        this._user = value; 
    }
    
    set jwt_token(value: string) {
        this._jwt_token = value; 
    }
    
    set expiration_time(value: string) {
        this._expiration_time = value; 
    }
    
}