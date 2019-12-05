import _ from 'lodash';

export default class SessionStatusDto {
    
    private _message: string;
    
    private _valid: boolean;
    
    constructor(data: any) {

        this._message = data.message;

        this._valid = data.valid;

    }

    toJSON(): any {
        return {

            message: this._message,

            valid: this._valid,

        }
    }
    
    get message(): string {
        return this._message;
    }
    
    get valid(): boolean {
        return this._valid;
    }
    
    
    set message(value: string) {
        this._message = value; 
    }
    
    set valid(value: boolean) {
        this._valid = value; 
    }
    
}