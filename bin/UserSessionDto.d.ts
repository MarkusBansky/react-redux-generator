export default class UserSessionDto {
    private _user_id;
    private _token;
    private _expiration_date;
    constructor(data: any);
    toJSON(): any;
    get user_id(): number;
    get token(): string;
    get expiration_date(): string;
    set user_id(value: number);
    set token(value: string);
    set expiration_date(value: string);
}
