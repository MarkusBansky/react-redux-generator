export default class GeneratorApiMethod {
    private _name;
    private _type;
    private _consumes;
    private _produces;
    private _requestBody?;
    constructor(name: string, data: any);
    get name(): string;
    set name(value: string);
    get consumes(): string;
    set consumes(value: string);
    get produces(): string;
    set produces(value: string);
    get requestBody(): {
        _name: string;
        _schema: any;
    };
    set requestBody(value: {
        _name: string;
        _schema: any;
    });
}
