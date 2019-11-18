export default class RequestParameter {
    private _name: string;
    private _required: boolean;
    private _type: string;

    constructor(data: any) {
        this._name = data.name;
        this._type = data.type;
        this._required = data.required;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get required(): boolean {
        return this._required;
    }

    set required(value: boolean) {
        this._required = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }
}