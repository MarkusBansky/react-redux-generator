import ModelItem from "../interfaces/modelItem";
import ModelProperty from "../interfaces/modelProperty";
export default class GeneratorApiModel {
    private readonly _name;
    private readonly _type;
    private _items?;
    private _properties?;
    constructor(name: string, data: any);
    get name(): string;
    get type(): string;
    get items(): ModelItem;
    get properties(): ModelProperty[];
}
