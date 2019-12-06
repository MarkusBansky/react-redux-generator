import chalk from "chalk";
import {getSchemaNameFromResponse, schemaPropertiesToTypedString} from "../utils";

export default class RequestBody {
    private _name: string;
    private _type: string;
    private _required: boolean;
    private _description?: string;

    constructor(requestBody: any) {
        let varName = getSchemaNameFromResponse(requestBody)
            .replace(/([Dd]to|[Dd]ao)/g, '');

        this._name = varName[0].toLowerCase() + varName.slice(1);
        this._type = getSchemaNameFromResponse(requestBody);
        this._required = requestBody.required !== undefined && requestBody.required;

        switch(this._type) {
            case 'array':
                this._name = 'requestArray';
                this._type = requestBody.content['application/json'].schema.items.type + '[]';
            case 'object':
                this._name = 'requestBody';
                this._type = schemaPropertiesToTypedString(requestBody.content['application/json'].schema);
        }
    }

    public toString(): string {
        return `${this._name}${this._required ? '' : '?'}: ${this._type}, `;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get schema(): string {
        return this._type;
    }

    set schema(value: string) {
        this._type = value;
    }

    get required(): boolean {
        return this._required;
    }

    set required(value: boolean) {
        this._required = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }
}