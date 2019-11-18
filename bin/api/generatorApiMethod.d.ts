import RequestBody from "../interfaces/requestBody";
import RequestParameter from "../interfaces/requestParameter";
export default class GeneratorApiMethod {
    private _name;
    private _type;
    private _consumes;
    private _produces;
    private _requestBody?;
    private _pathParameters;
    constructor(name: string, data: any);
    get name(): string;
    set name(value: string);
    get consumes(): string;
    set consumes(value: string);
    get produces(): string;
    set produces(value: string);
    get requestBody(): RequestBody;
    set requestBody(value: RequestBody);
    get pathParameters(): RequestParameter[];
    set pathParameters(value: RequestParameter[]);
}
