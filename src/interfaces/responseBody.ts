import {getSchemaNameFromResponse} from "../utils";

export default class ResponseBody {
    private _name: string;
    private _type: string;
    private _description?: string;

    constructor(response: any) {
        let varName = getSchemaNameFromResponse(response)
            .replace(/([Dd]to|[Dd]ao)/g, '');

        this._name = varName[0].toLowerCase() + varName.slice(1);
        this._type = getSchemaNameFromResponse(response);
        this._description = response.description;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }
}