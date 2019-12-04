export default class UserSessionDao {
    private _session_id;
    private _user;
    private _jwt_token;
    private _expiration_time;
    constructor(data: any);
    toJSON(): any;
    get session_id(): number;
    get user(): object;
    get jwt_token(): string;
    get expiration_time(): Date;
    set session_id(value: number);
    set user(value: object);
    set jwt_token(value: string);
    set expiration_time(value: Date);
}
