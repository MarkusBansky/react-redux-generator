export default class RequestBody {
    private _name: string;
    private _schema: any;

    constructor(data: any) {
        this._name = data.name;
        this._schema = data.schema;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get schema(): any {
        return this._schema;
    }

    set schema(value: any) {
        this._schema = value;
    }
}