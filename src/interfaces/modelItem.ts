export default class ModelItem {
    private readonly _type: string;

    constructor(data: any) {
        this._type = data.type;
    }

    get type(): string {
        return this._type;
    }
}