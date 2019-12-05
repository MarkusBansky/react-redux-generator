import _ from 'lodash';

export default class UserDao {
    
    private _id: number;
    
    private _username: string;
    
    private _password_hash: string;
    
    constructor(data: any) {

        this._id = data.id;

        this._username = data.username;

        this._password_hash = data.password_hash;

    }

    toJSON(): any {
        return {

            id: this._id,

            username: this._username,

            password_hash: this._password_hash,

        }
    }
    
    get id(): number {
        return this._id;
    }
    
    get username(): string {
        return this._username;
    }
    
    get password_hash(): string {
        return this._password_hash;
    }
    
    
    set id(value: number) {
        this._id = value; 
    }
    
    set username(value: string) {
        this._username = value; 
    }
    
    set password_hash(value: string) {
        this._password_hash = value; 
    }
    
}