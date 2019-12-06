export default class RequestBody {
    private _name;
    private _type;
    private _required;
    private _description?;
    constructor(responseBody: any);
    toString(): string;
    get name(): string;
    set name(value: string);
    get schema(): string;
    set schema(value: string);
    get required(): boolean;
    set required(value: boolean);
    get description(): string;
    set description(value: string);
}
