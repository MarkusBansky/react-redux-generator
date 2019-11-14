export default class RequestParameter {
    private _name;
    private _required;
    private _type;
    constructor(data: any);
    get name(): string;
    set name(value: string);
    get required(): boolean;
    set required(value: boolean);
    get type(): string;
    set type(value: string);
}
