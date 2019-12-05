import _ from 'lodash';

export default class UserDto {
    
    private _id: number;
    
    private _username: string;
    
    constructor(data: any) {

        this._id = data.id;

        this._username = data.username;

    }

    toJSON(): any {
        return {

            id: this._id,

            username: this._username,

        }
    }
    
    get id(): number {
        return this._id;
    }
    
    get username(): string {
        return this._username;
    }
    
    
    set id(value: number) {
        this._id = value; 
    }
    
    set username(value: string) {
        this._username = value; 
    }
    
}