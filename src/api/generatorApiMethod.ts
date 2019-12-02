import _ from 'lodash';
import {toFirstUpperLetter} from "../utils";
import RequestBody from "../interfaces/requestBody";
import RequestParameter from "../interfaces/requestParameter";

export default class GeneratorApiMethod {
    private _name: string;
    private _type: string;
    private _consumes: string;
    private _produces: string;
    private _resultVariableName: string;

    private _requestBody?: RequestBody;
    private _pathParameters: RequestParameter[];

    constructor(name: string, data: any) {
        this._name = data.description;
        this._type = toFirstUpperLetter(name);
        this._consumes = data.consumes && data.consumes[0];
        this._produces = data.produces && data.produces[0];
        this._resultVariableName = data.responses['200'].description;
        this._pathParameters = [];

        _.forEach(data.parameters, param => {
            if (param.in === 'body') {
                this._requestBody = new RequestBody(param);
            } else if (param.in === 'path') {
                this._pathParameters.push(new RequestParameter(param));
            }
        });
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

    get requestBody(): RequestBody {
        return this._requestBody;
    }

    set requestBody(value: RequestBody) {
        this._requestBody = value;
    }

    get pathParameters(): RequestParameter[] {
        return this._pathParameters;
    }

    set pathParameters(value: RequestParameter[]) {
        this._pathParameters = value;
    }
}