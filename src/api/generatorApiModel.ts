import _ from 'lodash';
import ModelItem from "../interfaces/modelItem";
import ModelProperty from "../interfaces/modelProperty";

export default class GeneratorApiModel {
    private readonly _name: string;
    private readonly _type: string;

    private _items?: ModelItem;
    private _properties?: ModelProperty[];

    constructor(name: string, data: any) {
        this._name = name;
        this._type = data.type;

        switch(this._type) {
            case 'object':
                this._properties = _.entries(data.properties).map(prop => new ModelProperty(prop[0], prop[1]));
                break;
            case 'array':
                this._items = new ModelItem(data.items);
        }
    }

    get name(): string {
        return this._name;
    }

    get type(): string {
        return this._type;
    }

    get items(): ModelItem {
        return this._items;
    }

    get properties(): ModelProperty[] {
        return this._properties;
    }
}