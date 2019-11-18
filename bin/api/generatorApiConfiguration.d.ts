export default class GeneratorApiConfiguration {
    private _name;
    private readonly _pathToDefinition;
    private readonly _pathToOutputFolder;
    private _serverUrl;
    private _models;
    private _paths;
    constructor(pathToDefinition: string, pathToBuild: string);
    getName(): string;
    private createApiStructure;
    private generateApiOutputs;
    /**
     * Creates this API with all required files.
     */
    create(): Promise<any>;
    /**
     * Generate API files in the output directory.
     */
    generate(): Promise<any>;
}
