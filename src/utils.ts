import chalk from "chalk";
import * as fs from "fs";
import * as path from "path";

export const toFirstUpperLetter = (text: string) => {
    return text[0].toUpperCase().concat(text.slice(1));
};

export const checkIfObjectIsEmpty = (name: string, element?: any) => {
    let date = new Date();
    if (element === undefined || element === null) {
        console.log(name + ' empty: ' + chalk.redBright(true) + ' - ' + date + ' ' + date.getMilliseconds() + 'ms');
        return;
    } else if (Array.isArray(element) && element.length === 0) {
        console.log(name + ' empty: ' + chalk.redBright(true) + ' - ' + date + ' ' + date.getMilliseconds() + 'ms');
        return;
    }
    console.log(name + ' not empty: ' + chalk.greenBright(false) + ' - ' + date + ' ' + date.getMilliseconds() + 'ms');
};

export const sentenceToCamelCase = (sentence: string) => {
    let words = sentence.replace(/[^a-zA-Z\s!?]/g,'').split(' ');
    let capitalizedTitle = words.map(w => toFirstUpperLetter(w)).join('');
    return capitalizedTitle[0].toLowerCase() + capitalizedTitle.slice(1);
};

/**
 * Remove directory recursively
 * @param {string} dir_path
 */
export function removeDirectory(dir_path) {
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

export function getSchemaNameFromResponse(response: any) {
    try {
        return response.content['application/json'].schema['$ref'].split('/').reverse()[0];
    } catch {
        return 'specify_the_return_schema_with_ref';
    }
}