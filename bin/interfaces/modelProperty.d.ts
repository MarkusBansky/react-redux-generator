export default class ModelProperty {
    private readonly _name;
    private readonly _type;
    constructor(name: string, data: any);
    get name(): string;
    get type(): string;
}
