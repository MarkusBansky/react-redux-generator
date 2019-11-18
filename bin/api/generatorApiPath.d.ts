import GeneratorApiMethod from "./generatorApiMethod";
export default class GeneratorApiPath {
    private _path;
    private _methods;
    constructor(name: string, data: any);
    get path(): string;
    set path(value: string);
    get methods(): GeneratorApiMethod[];
    set methods(value: GeneratorApiMethod[]);
}
