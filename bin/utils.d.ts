import RequestParameter from "./interfaces/requestParameter";
export declare const toFirstUpperLetter: (text: string) => string;
export declare const sentenceToCamelCase: (sentence: string) => string;
/**
 * Remove directory recursively
 * @param {string} dir_path
 */
export declare function removeDirectory(dir_path: any): void;
export declare function getSchemaNameFromResponse(response: any): string;
export declare function schemaPropertiesToTypedString(schema: any): string;
export declare function requestParametersToTypedString(parameters: RequestParameter[]): string;
export declare function requestParametersToUrlObjectString(parameters: RequestParameter[]): string;
