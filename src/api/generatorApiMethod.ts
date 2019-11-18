import _ from 'lodash';
import {toFirstUpperLetter} from "../utils";

export default class GeneratorApiMethod {
    private _name: string;
    private _type: string;
    private _consumes: string;
    private _produces: string;

    private _requestBody?: { _name: string, _schema: any };

    constructor(name: string, data: any) {
        this._name = data.description;
        this._type = toFirstUpperLetter(name);
        this._consumes = data.consumes[0];
        this._produces = data.produces[0];

        _.forEach(data.parameters, param => {
            if (param.in === 'body') {
                this._requestBody = {
                    _name: param.name,
                    _schema: param.schema,
                };

                return;
            }
        })
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get consumes(): string {
        return this._consumes;
    }

    set consumes(value: string) {
        this._consumes = value;
    }

    get produces(): string {
        return this._produces;
    }

    set produces(value: string) {
        this._produces = value;
    }

    get requestBody(): { _name: string; _schema: any } {
        return this._requestBody;
    }

    set requestBody(value: { _name: string; _schema: any }) {
        this._requestBody = value;
    }
}