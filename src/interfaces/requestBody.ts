import chalk from "chalk";
import {getSchemaNameFromResponse} from "../utils";

export default class RequestBody {
    private _name: string;
    private _type: string;
    private _required: boolean;
    private _description?: string;

    constructor(responseBody: any) {
        let varName = getSchemaNameFromResponse(responseBody)
            .replace(/([Dd]to|[Dd]ao)/g, '');

        this._name = varName[0].toLowerCase() + varName.slice(1);
        this._type = getSchemaNameFromResponse(responseBody);
        this._required = responseBody.required !== undefined && responseBody.required;

        console.log(chalk.cyan('requestBody: ' + this._name));
        console.log(this);
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