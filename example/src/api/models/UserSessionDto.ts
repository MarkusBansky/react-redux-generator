import _ from 'lodash';

export default class UserSessionDto {
    
    private _user_id: integer;
    
    private _token: string;
    
    private _expiration_date: string;
    
    constructor(data: any) {

        this._user_id = data.user_id;

        this._token = data.token;

        this._expiration_date = data.expiration_date;

    }

    toJSON(): any {
        return {

            user_id: this._user_id,

            token: this._token,

            expiration_date: this._expiration_date,

        }
    }
    
    get user_id(): integer {
        return this._user_id;
    }
    
    get token(): string {
        return this._token;
    }
    
    get expiration_date(): string {
        return this._expiration_date;
    }
    
    
    set user_id(value: integer) {
        this._user_id = value; 
    }
    
    set token(value: string) {
        this._token = value; 
    }
    
    set expiration_date(value: string) {
        this._expiration_date = value; 
    }
    
}