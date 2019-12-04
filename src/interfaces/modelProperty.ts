export default class ModelProperty {
    private readonly _name: string;
    private readonly _type: string;

    constructor(name: string, data: any) {
        this._name = name;

        // Change the JS type of the variable depending
        // on the initial type received from swagger
        switch(data.type) {
            case 'array':
                this._type = data.items.type + '[]';
                break;
            case 'integer':
                this._type = 'number';
                break;
            case 'string':
                if(data.items.format && data.items.format === 'date-time') {
                    this._type = 'Date';
                    break;
                }
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