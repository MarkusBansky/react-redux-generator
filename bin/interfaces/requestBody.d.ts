export default class RequestBody {
    private _name;
    private _schema;
    constructor(data: any);
    get name(): string;
    set name(value: string);
    get schema(): any;
    set schema(value: any);
}
