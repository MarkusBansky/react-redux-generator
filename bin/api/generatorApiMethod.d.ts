import RequestBody from "../interfaces/requestBody";
import RequestParameter from "../interfaces/requestParameter";
import ResponseBody from "../interfaces/responseBody";
export default class GeneratorApiMethod {
    private _name;
    private _type;
    private _consumes;
    private _produces;
    private _responseBody?;
    private _requestBody?;
    private _pathParameters;
    constructor(name: string, data: any);
    get name(): string;
    set name(value: string);
    get consumes(): string;
    set consumes(value: string);
    get produces(): string;
    set produces(value: string);
    get requestBody(): RequestBody | undefined;
    set requestBody(value: RequestBody);
    get pathParameters(): RequestParameter[];
    set pathParameters(value: RequestParameter[]);
    get type(): string;
    set type(value: string);
    get responseBody(): ResponseBody | undefined;
    set responseBody(value: ResponseBody);
}
