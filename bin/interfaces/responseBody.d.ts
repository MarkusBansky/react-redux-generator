export default class ResponseBody {
    private _name;
    private _type;
    private _description?;
    constructor(response: any);
    get name(): string;
    set name(value: string);
    get type(): string;
    set type(value: string);
    get description(): string;
    set description(value: string);
}
