import _ from 'lodash';
import {toFirstUpperLetter} from "../utils";
import RequestBody from "../interfaces/requestBody";
import RequestParameter from "../interfaces/requestParameter";
import chalk from "chalk";
import ResponseBody from "../interfaces/responseBody";

export default class GeneratorApiMethod {
    private _name: string;
    private _type: string;
    private _consumes: string;
    private _produces: string;

    private _responseBody?: ResponseBody;
    private _requestBody?: RequestBody;

    private _pathParameters: RequestParameter[];

    constructor(name: string, data: any) {
        this._name = toFirstUpperLetter(data.operationId);
        this._type = toFirstUpperLetter(name);
        this._consumes = data.consumes && data.consumes[0];
        this._produces = data.produces && data.produces[0];

        this._pathParameters = [];
        this._responseBody = undefined;
        this._requestBody = undefined;

        if (data.responses['200']) {
            this._responseBody = new ResponseBody(data.responses['200']);
        }

        if (data.requestBody) {
            this._requestBody = new RequestBody(data.requestBody);
        }

        // _.forEach(data.parameters, param => {
        //     if (param.in === 'body') {
        //         this._requestBody = new RequestBody(param);
        //     } else if (param.in === 'path') {
        //         this._pathParameters.push(new RequestParameter(param));
        //     }
        // });
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

    get requestBody(): RequestBody | undefined {
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

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get responseBody(): ResponseBody | undefined {
        return this._responseBody;
    }

    set responseBody(value: ResponseBody) {
        this._responseBody = value;
    }
}