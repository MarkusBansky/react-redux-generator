export default class SessionStatusDto {
    private _message;
    private _valid;
    constructor(data: any);
    toJSON(): any;
    get message(): string;
    get valid(): boolean;
    set message(value: string);
    set valid(value: boolean);
}
