import _ from 'lodash';
import GeneratorApiMethod from "./generatorApiMethod";

export default class GeneratorApiPath {
    private _path: string;
    private _methods: GeneratorApiMethod[];

    constructor(name: string, data: any) {
        this._path = name;
        this._methods = _.entries(data).map(entry => new GeneratorApiMethod(entry[0], entry[1]));
    }

    get path(): string {
        return this._path;
    }

    set path(value: string) {
        this._path = value;
    }

    get methods(): GeneratorApiMethod[] {
        return this._methods;
    }

    set methods(value: GeneratorApiMethod[]) {
        this._methods = value;
    }
}