import _ from 'lodash';
import chalk from "chalk";
import * as fs from "fs";
import * as path from "path";
import RequestParameter from "./interfaces/requestParameter";

export const toFirstUpperLetter = (text: string): string => {
    return text[0].toUpperCase().concat(text.slice(1));
};

export const sentenceToCamelCase = (sentence: string): string => {
    let words = sentence.replace(/[^a-zA-Z\s!?]/g,'').split(' ');
    let capitalizedTitle = words.map(w => toFirstUpperLetter(w)).join('');
    return capitalizedTitle[0].toLowerCase() + capitalizedTitle.slice(1);
};

/**
 * Remove directory recursively
 * @param {string} dir_path
 */
export function removeDirectory(dir_path): void {
    if (fs.existsSync(dir_path)) {
        fs.readdirSync(dir_path).forEach(function(entry) {
            const entry_path = path.join(dir_path, entry);
            if (fs.lstatSync(entry_path).isDirectory()) {
                removeDirectory(entry_path);
            } else {
                fs.unlinkSync(entry_path);
            }
        });
        fs.rmdirSync(dir_path);
    }
}

export function getSchemaNameFromResponse(response: any): string {
    try {
        if (response.content['application/json'].schema['$ref']) {
            return response.content['application/json'].schema['$ref'].split('/').reverse()[0];
        } else {
            return response.content['application/json'].schema.type;
        }
    } catch {
        return 'specify_the_return_schema_with_ref';
    }
}

export function schemaPropertiesToTypedString(schema: any): string {
    let result = '{ ';

    _.map(schema.properties, (e, key) => {
        result += `${key}: `;

        switch (e.type) {
            case 'array':
                if (e.items.type == 'integer') {
                    result += `number[], `;
                } else {
                    result += `${e.items.type}[], `;
                }
                break;
            case 'object':
                result += schemaPropertiesToTypedString(e) + ', ';
                break;
            case 'integer':
                result += 'number, ';
                break;
            default:
                result += `${e.type}, `;
        }
    });

    if (_.keys(schema.properties).length > 0) {
        result = result.slice(0, result.length - 2);
    }

    result += ' }';
    return result;
}

export function requestParametersToTypedString(parameters: RequestParameter[]): string {
    let result = '';

    _.forEach(parameters, param => {
        result += `${param.name}${param.required ? '' : '?'}: ${param.type}, `;
    });

    return result;
}

export function requestParametersToUrlObjectString(parameters: RequestParameter[]): string {
    let result = '';

    _.forEach(parameters, param => {
        result += `{name: \'${param.name}\', value: ${param.name}}, `;
    });

    return result;
}