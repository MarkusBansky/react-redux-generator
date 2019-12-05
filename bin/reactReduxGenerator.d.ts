import Listr from 'listr';
/**
 * Main file used to generate API structure from Swagger definition.
 */
export default class ReactReduxGenerator {
    private _pathToApiDefinitionsFolder;
    private _pathToApiBuildFolder;
    private _apisDefinitionFiles;
    private _generators;
    /**
     * Used to instantiate object of class. Sets default values to global variables, creates list of tasks
     * for API creation and generation.
     */
    constructor();
    /**
     * Used to start the generation sequence of tasks.
     */
    start(): void;
    /**
     * Try to read the configuration file if it exists, then set all global variables to be equal to values extracted
     * from the config file. If it does not exist then system would use default values.
     */
    readConfig: () => Promise<unknown>;
    clearOutputDirectory: () => Promise<unknown>;
    readInputDirectory: () => Promise<unknown>;
    /**
     * For each API file in the input folder, create a new API generator configuration class object with input path
     * to it's relevant file. Later these files would be used to generate different API files.
     */
    createGeneratorsFromAPIFiles: () => Promise<unknown>;
    /**
     * For each of the API generators, runs the create sequence to go through all the data in the API definition and
     * create a code structure in memory of this API construction.
     */
    createAPICodeStructure: () => Listr<any>;
    /**
     * Generate all utility files that are going to be used by other files in generated code.
     * These are always stable templates, and contain sample constants and general utility functions.
     * There are two files that are being created: constants.ts and utils.ts. They are being created
     * in the utils directory.
     */
    generateUtilityFiles: () => Promise<unknown>;
    /**
     * Run generate sequence for each of API generators. It creates several files for models, defined in the API,
     * actions, that are used in the code to create requests and reducer, that collects all data and state received
     * from the request and then processes it and passes to the view.
     */
    generateAPIFiles: () => Promise<unknown>;
}
