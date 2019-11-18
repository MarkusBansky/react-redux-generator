export default class ModelProperty {
    private readonly _name: string;
    private readonly _type: string;

    constructor(name: string, data: any) {
        this._name = name;

        switch(data.type) {
            case 'array':
                this._type = data.items.type + '[]';
                break;
            default:
                this._type = data.type;
                break;
        }
    }

    get name(): string {
        return this._name;
    }

    get type(): string {
        return this._type;
    }
}