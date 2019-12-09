import {getSchemaNameFromResponse} from "../utils";

export default class RequestParameter {
    private _name: string;
    private _required: boolean;
    private _type: string;

    constructor(data: any) {
        this._name = data.name;
        this._required = data.required;

        switch(data.schema.type) {
            case 'array':
                if (data.schema.items.type == 'integer') {
                    this._type = 'number[]';
                } else {
                    this._type = data.schema.items.type + '[]';
                }
                break;
            case 'integer':
                this._type = 'number';
                break;
            case undefined:
                if (data['$ref']) {
                    this._type = getSchemaNameFromResponse(data['$ref']);
                    break;
                }
            default:
                this._type = data.schema.type;
                break;
        }
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